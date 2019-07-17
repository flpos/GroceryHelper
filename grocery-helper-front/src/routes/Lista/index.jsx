import React from 'react'
import './styles.css'

import Produto from '../../components/produto'

import database from '../../services/produtos'

export default class Lisa extends React.Component {
  state = {
    produtos: []
  }
  componentDidMount() {
    let produtos = database.list()
    this.setState({ produtos })
  }
  novoProdutoHandler(e) {
    e.preventDefault()
    this.setState({
      produtos: [...this.state.produtos, database.create(document.querySelector('#NovoItem').value)]
    })
    document.querySelector('#NovoItem').value = ''
  }
  render() {
    return (
      <div className="lista-produtos">
        <ul>
          {
            this.state.produtos
              .map(prod => <Produto key={prod.id} {...prod} />)
          }
        </ul>
        <form onSubmit={this.novoProdutoHandler.bind(this)}>
          <input type="text" name="novo" id="NovoItem" placeholder="Novo Item" />
          <button>Criar</button>
        </form>
      </div>
    )
  }
}
