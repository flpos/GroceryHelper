import { Schema, model, Document } from 'mongoose'

import { produtoSchema, Produto } from './produto'

const usuarioSchema = new Schema({
    nome: String,
    password: String,
    produtos: [produtoSchema]
})

export default model('usuario', usuarioSchema)

export type Usuario = {
    nome: String,
    password: String,
    produtos: Array<Produto>
}

export type UsuarioDoc = Usuario & Document
