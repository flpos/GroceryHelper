const { Schema, model } = require('mongoose')

const alteracaoSchema = require('./alteracao')

let produtoSchema = new Schema({
    nome: String,
    quantidade: Number,
    alteracoes: [alteracaoSchema]
})

module.exports = model('produto', produtoSchema)