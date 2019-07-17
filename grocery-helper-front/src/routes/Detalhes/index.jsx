import React, { Component } from 'react';

import database from '../../services/produtos'
import './styles.css'

export default class Detalhes extends Component {
  constructor(params) {
    super(params)
    this.id = params.match.params.id
  }
  state = {
    produto: {}
  }
  componentDidMount() {
    this.setState({ produto: database.read(this.id) })
  }
  render() {
    return (
      <div id="detalhes">
        <h3>{this.state.produto.nome}</h3>
        <div>
          <p>Acaba dia ...</p>
          <p>Uso por Mês: ...</p>
        </div>
        <ul>
          <li>12/07 - 2Kg</li>
          <li>13/07 - 1Kg</li>
          <li>14/07 - 0.5Kg</li>
        </ul>
        <div>
          <img src="https://via.placeholder.com/400x200" alt="Graficos"/>
        </div>
      </div>
    )
  }
}
