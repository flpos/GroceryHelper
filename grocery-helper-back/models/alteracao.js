const { Schema, model } = require('mongoose')

const alteracao = new Schema({
    data: {
        type: Date,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    }
})

module.exports = alteracao