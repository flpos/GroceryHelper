import React from 'react'
import { Form, InputGroup, Button, FormControl, ListGroup, Container } from 'react-bootstrap'
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
      <Container className="lista-produtos">
        <ListGroup>
          {
            this.state.produtos
              .map(prod => <Produto key={prod.id} {...prod} />)
          }
        </ListGroup>

        <Form onSubmit={this.novoProdutoHandler.bind(this)} style={{marginTop:20+'px'}}>
          <InputGroup>
            <FormControl
              placeholder="Novo Item"
              id="NovoItem"
            />
            <InputGroup.Append>
              <Button type="submit">Criar</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </Container>
    )
  }
}
