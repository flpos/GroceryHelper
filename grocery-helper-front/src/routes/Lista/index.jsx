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
    database.list().then(produtos => this.setState({ produtos }))
  }
  async novoProdutoHandler(e) {
    e.preventDefault()
    await database
      .create(document.querySelector('#NovoItem').value)
      .then(data => this.setState({ produtos: [...this.state.produtos, data] }))
      .catch(err => console.log(err))
    document.querySelector('#NovoItem').value = ''
  }
  render() {
    return (
      <Container className="lista-produtos">
        <ListGroup>
          {
            !!this.state.produtos && this.state.produtos
              .map(prod => <Produto key={prod._id} id={prod._id} {...prod} />)
          }
        </ListGroup>

        <Form onSubmit={this.novoProdutoHandler.bind(this)} style={{ marginTop: 20 + 'px' }}>
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
