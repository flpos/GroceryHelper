import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Row, Col, Container, Button, ListGroup, Form, FormGroup, FormControl } from 'react-bootstrap'

import moment from 'moment'

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
    database.read(this.id).then(produto => {
      this.setState({ produto })
    })
  }
  mostrarModal = (altID = '') => {
    document.querySelector('#idAlt').value = altID
    let data = new Date()
    let quantidade = 0
    document.querySelector('#excluir').setAttribute('hidden', true)
    document.querySelector('#alteracao-btn').innerHTML = 'Nova Alteração'
    if (altID) {
      document.querySelector('#alteracao-btn').innerHTML = 'Concluir Edição'
      document.querySelector('#excluir').removeAttribute('hidden')
      let alteracao = this.state.produto.alteracoes.find(alt => alt._id === altID)
      data = new Date(alteracao.data)
      quantidade = alteracao.quantidade
    }

    document.querySelector('#data').value = data.toISOString().slice(0, 10)
    document.querySelector('#quantidade').value = quantidade
    document.querySelector('#modal').removeAttribute('hidden')
  }
  esconderModal = (e) => {
    e.preventDefault()
    document.querySelector('#modal').setAttribute('hidden', true)
    document.querySelectorAll('.reset').forEach(input => input.value = '')
  }
  novaAlteracao = (e) => {
    e.preventDefault()
    let id = document.querySelector('#id').value
    let idAlteracao = document.querySelector('#idAlt').value
    let data = document.querySelector('#data').value
    let quantidade = document.querySelector('#quantidade').value

    document.querySelector('#modal').setAttribute('hidden', true)
    document.querySelectorAll('.reset').forEach(input => input.value = '')

    if (idAlteracao === '') {
      database.criarAlteracao(id, data, quantidade)
        .then(response => this.setState({ produto: response.data }))
    } else {
      database.editarAlteracao(id, idAlteracao, data, quantidade)
        .then(response => this.setState({ produto: response.data }))
    }
  }
  excluir = () => {
    database.delete(this.id).then(() => this.setState({ produto: null }))
  }
  excluirAlteracao = (e) => {
    e.preventDefault()
    let idProduto = document.querySelector('#id').value
    let idAlteracao = document.querySelector('#idAlt').value

    document.querySelector('#modal').setAttribute('hidden', true)
    document.querySelectorAll('.reset').forEach(input => input.value = '')

    database.excluirAlteracao(idProduto, idAlteracao)
      .then(response => this.setState({ produto: response.data }))
  }
  render() {
    return ((this.state.produto !== null) ?
      <Container id="detalhes">
        <Row>
          <Col id="dados" sm={12} md={6}>
            <h3>{this.state.produto.nome}</h3>
          </Col>

          <Col id='previsoes' sm={12} md={6}>
            <Row>
              <Col xs={8}>Acaba em:</Col>
              <Col className='align-right'>{this.state.produto.fim} {(this.state.produto.fim > 1) ? 'meses' : 'mês'}</Col>
            </Row>
            <Row>
              <Col xs={8}>Uso estimado por Mês:</Col>
              <Col className='align-right'>{this.state.produto.mes}</Col>
            </Row>
          </Col>

        </Row>

        <Row>
          <Col id="alteracoes" sm={12} md={6}>
            <ListGroup>
              {
                this.state.produto.alteracoes && this.state.produto.alteracoes.map((alt, index) => (
                  <ListGroup.Item
                    className="alteracao"
                    key={index}
                    onClick={() => this.mostrarModal(alt._id)}
                  >
                    <Row>
                      <Col>{moment(alt.data).fromNow()}</Col>
                      <Col className='align-right'>{alt.quantidade}</Col>
                    </Row>
                  </ListGroup.Item>
                ))
              }
              <Button onClick={() => this.mostrarModal()}>Nova alteração</Button>
            </ListGroup>
          </Col>

          <Col sm={12} md={6}>
            <div id="graficos"></div>
          </Col>
        </Row>

        <Row style={{ padding: 15 + "px" }}>
          <Button block variant="danger" onClick={this.excluir}>Excluir</Button>
        </Row>
        <Form id="modal" hidden>
          <FormGroup id='container'>
            <FormControl hidden id='id' value={this.id} readOnly />
            <FormControl hidden id='idAlt' className='reset' readOnly />
            <FormControl className="reset" type="date" name="data" id="data" />
            <FormControl className="reset" type="number" name="quantidade" id="quantidade" />
            <Button type="submit" variant="info" id="alteracao-btn" block onClick={this.novaAlteracao}>Nova alteração</Button>
            <Button type="reset" variant="danger" id="excluir" block onClick={this.excluirAlteracao}>Excluir</Button>
            <Button type="reset" variant="warning" block onClick={this.esconderModal}>Cancelar</Button>
          </FormGroup>
        </Form>
      </Container> : <Redirect to={'/'} />
    )
  }
}
