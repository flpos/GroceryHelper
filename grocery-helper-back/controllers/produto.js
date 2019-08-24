const Produto = require('../models/produto')

// Criar função para definir o uso por mês
const usoPorMes = produto => {
    const { alteracoes } = produto
    let uso = 0
    if (alteracoes == undefined || alteracoes.lenght < 1) return null
    // identificar intervalor onde há diminuição
    // vamos iterar o array e pegar a quantidade usada e os dias que passaram
    let diminuicao = []
    for (let i = 0; i < alteracoes.length - 1; i++) {
        // pegar intervalo de dias
        let data1 = new Date(alteracoes[i].data)
        let data2 = new Date(alteracoes[i + 1].data)
        let intervalo = (new Date(data2 - data1).getTime()) / 1000 / 60 / 60 / 24

        // pegar diferença de quantidade
        let quantidade = alteracoes[i].quantidade - alteracoes[i + 1].quantidade
        if (quantidade > 0) diminuicao.push({ intervalo, quantidade })
    }
    // definir uso
    uso = diminuicao
        .map(val => ({ x: (val.quantidade * val.intervalo), peso: val.intervalo }))
        .reduce((prev, curr) => ({ x: prev.x + curr.x, peso: prev.peso + curr.peso }))
    uso = uso.x / uso.peso
    return uso
}
const duracaoEstimada = produto => {
    if (produto.mes > 0) return (produto.alteracoes[produto.alteracoes.length - 1].quantidade / (produto.mes))
    else return null
}

const produtoController = {
    create: (req, res) => {
        const { nome } = req.body.produto
        const novoProduto = new Produto({ nome }).save((err, prod) => {
            return res.send(prod)
        })
    },
    read: (req, res) => {
        let { id } = req.params
        if (id) {
            Produto.findOne({ _id: { $eq: id } }, (err, prod) => {
                return res.json(prod)
            })
        }
        else {
            Produto.find((err, produto) => {
                res.json(produto)
            })
        }
    },
    update: (req, res) => {
        const { id } = req.params
        const { produto } = req.body
        Produto.findByIdAndUpdate(id, produto, (err, prod) => {
            res.json(prod)
        })
    },
    delete: (req, res) => {
        const { id } = req.params
        Produto.findByIdAndDelete(id, (err, prod) => {
            res.json(prod)
        })
    },
    alteracao: {
        create: (req, res) => {
            const { id: produtoId } = req.params
            const { alteracao } = req.body

            Produto.findById(produtoId, (err, produto) => {
                produto.alteracoes.push({
                    data: new Date(alteracao.data),
                    quantidade: alteracao.quantidade
                })
                produto.mes = usoPorMes(produto)
                produto.fim = duracaoEstimada(produto)
                produto.save()
                res.json(produto)
            })
        },
        update: (req, res) => {
            const { id: produtoId, altId } = req.params
            const { alteracao } = req.body

            Produto.findById(produtoId, (err, produto) => {
                produto.alteracoes = produto.alteracoes.map(alt => (alt._id == altId) ? alteracao : alt)
                produto.mes = usoPorMes(produto)
                produto.fim = duracaoEstimada(produto)
                produto.save()
                res.json(produto)
            })
        },
        delete: (req, res) => {
            const { id: produtoId, altId } = req.params

            Produto.findById(produtoId, (err, produto) => {
                produto.alteracoes = produto.alteracoes.filter(alt => alt._id != altId)
                produto.mes = usoPorMes(produto)
                produto.fim = duracaoEstimada(produto)
                produto.save()
                res.json(produto)
            })
        },
    }
}

module.exports = produtoController