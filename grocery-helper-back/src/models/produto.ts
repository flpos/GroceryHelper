import { Schema, model, Document } from 'mongoose'

import { alteracaoSchema, AlteracaoDoc } from './alteracao'

export const produtoSchema = new Schema({
    nome: String,
    quantidade: Number,
    alteracoes: [alteracaoSchema],
    fim: Number,
    mes: Number
})

export default model('produto', produtoSchema)

export type Produto = {
    nome: String,
    quantidade: Number,
    alteracoes: Array<AlteracaoDoc>,
    fim: Number,
    mes: Number
}

export type ProdutoDoc = Produto & Document