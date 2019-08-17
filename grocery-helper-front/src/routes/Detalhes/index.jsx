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
    let data = database.read(this.id)
    this.setState({ produto: data })
  }
  mostrarModal = (e) => {
    e.preventDefault()
    document.querySelector('#data').value = new Date().toISOString().slice(0, 10)
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
    let data = document.querySelector('#data').value
    let quantidade = document.querySelector('#quantidade').value
    console.log(database.novaAlteracao(id, data, quantidade))
    document.querySelector('#modal').setAttribute('hidden', true)
    document.querySelectorAll('.reset').forEach(input => input.value = '')

    let produto = database.read(id)
    this.setState({ produto })
  }
  excluir = () => {
    database.delete(this.id)
    this.setState({produto: database.read(this.id)})
  }
  render() {
    return ( (this.state.produto !== undefined)?
      <Container id="detalhes">
        <Row>
          <Col id="dados">
            <h3>{this.state.produto.nome}</h3>
          </Col>

          <Col id='previsoes'>
            <Row>
              <Col xs={8}>Acaba em:</Col>
              <Col className='align-right'>{this.state.produto.fim} {(this.state.produto.fim > 1)?'meses':'mês'}</Col>
            </Row>
            <Row>
              <Col xs={8}>Uso estimado por Mês:</Col>
              <Col className='align-right'>{this.state.produto.mes}</Col>
            </Row>
          </Col>

        </Row>

        <Row>
          <Col id="alteracoes">
            <ListGroup>
              {
                this.state.produto.alteracoes && this.state.produto.alteracoes.map((alt, index) => (
                  <ListGroup.Item className="alteracao" key={index}>
                    <Row>
                      <Col>{moment(alt.data).fromNow()}</Col>
                      <Col className='align-right'>{alt.quantidade}</Col>
                    </Row>
                  </ListGroup.Item>
                ))
              }
              <Button onClick={this.mostrarModal}>Nova alteração</Button>
            </ListGroup>
          </Col>

          <Col>
            <div id="graficos"></div>
          </Col>
        </Row>

        <Row style={{ padding: 15 + "px" }}>
          <Button block variant="danger" onClick={this.excluir}>Excluir</Button>
        </Row>
        <Form id="modal" hidden>
          <FormGroup id='container'>
            <FormControl hidden id='id' value={this.id} readOnly />
            <FormControl className="reset" type="date" name="data" id="data" />
            <FormControl className="reset" type="number" name="quantidade" id="quantidade" />
            <Button type="submit" variant="info" block onClick={this.novaAlteracao}>Nova alteração</Button>
            <Button type="reset" variant="danger" block onClick={this.esconderModal}>Cancelar</Button>
          </FormGroup>
        </Form>
      </Container> : <Redirect to={'/'} />
    )
  }
}
