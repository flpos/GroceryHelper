const Router = require('express').Router()

const produtoController = require('./controllers/produto')
const usuarioController = require('./controllers/usuario')

const test = (req, res) => res.send({path: req.path, params: req.params, body: req.body})

Router.route('/produto/:id?')
    .post(produtoController.create)
    .get(produtoController.read)
    .put(produtoController.update)
    .delete(produtoController.delete)

Router.route('/produto/:id/alteracao/:altId?')
    .post(produtoController.alteracao.create)
    .put(produtoController.alteracao.update)
    .delete(produtoController.alteracao.delete)

Router.route('/usuario')
    .post(usuarioController.create)
    .get(usuarioController.read)
    .put(usuarioController.update)
    .delete(usuarioController.delete)

module.exports = Router
