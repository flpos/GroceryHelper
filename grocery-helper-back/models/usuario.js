const {Schema, model} = require('mongoose')

const produtoSchema = require('./produto')

const usuarioSchema = new Schema({
    nome: String,
    password: String,
    produtos: [produtoSchema]
})

module.exports = model('usuario', usuarioSchema)
