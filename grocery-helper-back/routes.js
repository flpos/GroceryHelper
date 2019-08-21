const Router = require('express').Router()

const produtoController = require('./controllers/produto')

const test = (req, res) => res.send({ path: req.path, params: req.params, body: req.body })

Router.route('/produto/:id?')
    .post(produtoController.create)
    .get(produtoController.read)
    .put(produtoController.update)
    .delete(produtoController.delete)

Router.route('/produto/:id/alteracao/:altId?')
    .post(produtoController.alteracao.create)
    .put(produtoController.alteracao.update)
    .delete(produtoController.alteracao.delete)

Router.all('/', (req, res) => {
    res.json('Bem vindo!')
})

module.exports = Router