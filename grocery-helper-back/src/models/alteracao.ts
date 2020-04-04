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

export type Alteracao = Document & {
    data: Date,
    quantidade: number
}