const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const { username, password } = require('./dbconfig.json')

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-5dvpd.mongodb.net/test?retryWrites=true&w=majority`
    , { useNewUrlParser: true }
    , (err)=>{
        if (err) console.log(err)
        console.log('Banco de dados conectado')
    })

app.all('*', (req, res, next) => {
    console.log(`Requisição ${req.method} na rota ${req.path}`)
    next()
})

app.use('/', require('./routes'))

app.listen(PORT, () => console.log(`Servindo na porta: ${PORT}`))