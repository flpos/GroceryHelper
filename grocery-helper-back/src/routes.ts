const Router = require('express').Router()

import { produtoController, alteracaoController } from './controllers/produto'
import { usuarioController } from './controllers/usuario'

Router.route('/produto/:id?')
    .post(produtoController.create)
    .get(produtoController.read)
    .put(produtoController.update)
    .delete(produtoController.delete)

Router.route('/produto/:id/alteracao/:altId?')
    .post(alteracaoController.create)
    .put(alteracaoController.update)
    .delete(alteracaoController.delete)

Router.route('/usuario/:userId?')
    .post(usuarioController.create)
    .get(usuarioController.read)
    .put(usuarioController.update)
    .delete(usuarioController.delete)

export default Router