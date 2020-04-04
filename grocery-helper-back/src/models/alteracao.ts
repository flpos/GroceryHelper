import { Schema, Document } from 'mongoose'

export const alteracaoSchema = new Schema({
    data: {
        type: Date,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    }
})

export type Alteracao = {
    data: Date,
    quantidade: number
}

export type AlteracaoDoc = Alteracao & Document