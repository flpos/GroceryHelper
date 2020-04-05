import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Container, Jumbotron } from 'react-bootstrap'
import './App.css'

import Lista from './routes/Lista'
import Detalhes from './routes/Detalhes'

function App() {
  return (
    <Container className="App">
      <BrowserRouter>
        <header className="header">
          <Link to='/'><Jumbotron><h2>Grocery Helper</h2></Jumbotron></Link>
        </header>
        <Route path="/" exact component={Lista} />
        <Route path="/detalhes/:id" component={Detalhes} />
      </BrowserRouter>
    </Container>
  )
}

export default App
