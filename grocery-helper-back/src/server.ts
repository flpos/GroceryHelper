import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

import { username, password } from './config/dbconfig.json'

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-5dvpd.mongodb.net/groceryHelper?retryWrites=true&w=majority`
    , { useNewUrlParser: true, useUnifiedTopology: true }
    , (err) => {
        if (err) console.log(err)
        console.log('Banco de dados conectado')
    })

app.use('/', require('./routes').default)
app.use(express.static(path.resolve('../grocery-helper-front/build')))

app.listen(PORT, () => console.log(`Servindo na porta: ${PORT}`))