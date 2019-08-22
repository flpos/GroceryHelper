const Produto = require('../models/produto')
const Alteracao = require('../models/alteracao')

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
                produto.save()
                res.json(produto)
            })
        },
        update: (req, res) => {
            const { id: produtoId, altId } = req.params
            const { alteracao } = req.body

            Produto.findById(produtoId, (err, produto) => {
                produto.alteracoes = produto.alteracoes.map(alt => (alt._id == altId) ? alteracao : alt)
                produto.save()
                res.json(produto)
            })
        },
        delete: (req, res) => {
            const { id: produtoId, altId } = req.params

            Produto.findById(produtoId, (err, produto) => {
                produto.alteracoes = produto.alteracoes.filter(alt => alt._id != altId)
                produto.save()
                res.json(produto)
            })
        },
    }
}

module.exports = produtoController