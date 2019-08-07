import React, { Component } from 'react';
import { Row, Col, Container, Button, ListGroup } from 'react-bootstrap'

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
  novaAlteracao() {

  }
  render() {
    return (
      <Container id="detalhes">
        <Row>
          <Col id="dados">
            <h3>{this.state.produto.nome}</h3>
          </Col>

          <Col id='previsoes'>
            <Row>
              <Col>Acaba:</Col>
              <Col>{this.state.produto.fim}</Col>
            </Row>
            <Row>
              <Col>Uso por Mês:</Col>
              <Col>{this.state.produto.mes}</Col>
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
                      <Col>{alt.data.toISOString().slice(0, 10)}</Col>
                      <Col>{alt.quantidade}</Col>
                    </Row>
                  </ListGroup.Item>
                ))
              }
              <Button>Nova alteração</Button>
            </ListGroup>
          </Col>

          <Col id="graficos">
            <img src="https://via.placeholder.com/400x200" alt="Graficos" />
          </Col>
        </Row>

        <Row style={{padding: 15 + "px"}}>
          <Button block variant="danger">Excluir</Button>
        </Row>
      </Container>
    )
  }
}
