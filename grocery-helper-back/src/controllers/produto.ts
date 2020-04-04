import ProdutoModel, { Produto, ProdutoDoc } from "../models/produto"
import { AlteracaoDoc } from '../models/alteracao'
import { RequestHandler } from "express"
import { Document } from "mongoose"

// Criar função para definir o uso por mês
const usoPorMes = (produto: Produto) => {
    const { alteracoes } = produto
    let uso: any = 0

    if (alteracoes == undefined || alteracoes.length < 2) return null
    // identificar intervalor onde há diminuição
    // vamos iterar o array e pegar a quantidade usada e os dias que passaram
    let diminuicao = []
    for (let i = 0; i < alteracoes.length - 1; i++) {
        // pegar intervalo de dias
        let data1 = new Date(alteracoes[i].data)
        let data2 = new Date(alteracoes[i + 1].data)
        let intervalo = (new Date(data2.getTime() - data1.getTime()).getTime()) / 1000 / 60 / 60 / 24

        // pegar diferença de quantidade
        let quantidade = alteracoes[i].quantidade - alteracoes[i + 1].quantidade
        if (quantidade > 0) diminuicao.push({ intervalo, quantidade })
    }
    if (diminuicao.length < 1) return null
    else if (diminuicao.length === 1) uso = diminuicao[0].quantidade / diminuicao[0].intervalo
    else {
        // definir uso
        uso = diminuicao
            .map(val => ({ x: (val.quantidade * val.intervalo), peso: val.intervalo }))
            .reduce((prev, curr) => ({ x: prev.x + curr.x, peso: prev.peso + curr.peso }))
        uso = uso.x / uso.peso
    }
    return uso.toFixed(2)
}
const duracaoEstimada = (produto: Produto): Number => {
    if (produto.mes > 0) return Number((produto.alteracoes[produto.alteracoes.length - 1].quantidade / Number(produto.mes)).toFixed(1))
    else return 0
}

export class produtoController {
    static create: RequestHandler = (req, res) => {
        const { nome } = req.body.produto
        const novoProduto = new ProdutoModel({ nome }).save((err, prod) => {
            return res.send(prod)
        })
    }
    static read: RequestHandler = (req, res) => {
        let { id } = req.params
        if (id) {
            ProdutoModel.findOne({ _id: { $eq: id } }, (err, prod) => {
                return res.json(prod)
            })
        }
        else {
            ProdutoModel.find((err, produto) => {
                res.json(produto)
            })
        }
    }
    static update: RequestHandler = (req, res) => {
        const { id } = req.params
        const { produto } = req.body
        ProdutoModel.findByIdAndUpdate(id, produto, (err, prod) => {
            res.json(prod)
        })
    }
    static delete: RequestHandler = (req, res) => {
        const { id } = req.params
        ProdutoModel.findByIdAndDelete(id, (err, prod) => {
            res.json(prod)
        })
    }
}


export class alteracaoController {
    static create: RequestHandler = (req, res) => {
        const { id: produtoId } = req.params
        const { alteracao } = req.body

        ProdutoModel.findById(produtoId, (err, produto: ProdutoDoc) => {
            if (produto) {
                produto.alteracoes.push(({
                    data: new Date(alteracao.data),
                    quantidade: alteracao.quantidade
                } as AlteracaoDoc))
                produto.mes = usoPorMes(produto)
                produto.fim = duracaoEstimada(produto)
                produto.save().catch(e => console.log(e))
                res.json(produto)
            } else {
                res.status(404).send('produto não encontrado')
            }
        })
    }
    static update: RequestHandler = (req, res) => {
        const { id: produtoId, altId } = req.params
        const { alteracao } = req.body

        ProdutoModel.findById(produtoId, (err, produto: ProdutoDoc) => {
            if (produto) {
                produto.alteracoes = produto.alteracoes.map(alt => (alt._id == altId) ? alteracao : alt)
                produto.mes = usoPorMes(produto)
                produto.fim = duracaoEstimada(produto)
                produto.save().catch(e => console.log(e))
                res.json(produto)
            } else {
                res.status(404).send('produto não encontrado')
            }
        })
    }
    static delete: RequestHandler = (req, res) => {
        const { id: produtoId, altId } = req.params

        ProdutoModel.findById(produtoId, (err, produto: ProdutoDoc) => {
            if (produto) {
                produto.alteracoes = produto.alteracoes.filter(alt => alt._id != altId)
                produto.mes = usoPorMes(produto)
                produto.fim = duracaoEstimada(produto)
                produto.save().catch(e => console.log(e))
                res.json(produto)
            } else {
                res.status(404).send('produto não encontrado')
            }
        })
    }
}