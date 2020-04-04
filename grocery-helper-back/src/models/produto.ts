import { Schema, model, Document } from 'mongoose'

import { alteracaoSchema, Alteracao } from './alteracao'

let produtoSchema = new Schema({
    nome: String,
    quantidade: Number,
    alteracoes: [alteracaoSchema],
    fim: Number,
    mes: Number
})

export default model('produto', produtoSchema)

export type Produto = Document & {
    nome: String,
    quantidade: Number,
    alteracoes: Array<Alteracao>,
    fim: Number,
    mes: Number
}