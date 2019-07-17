import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css'

import Lista from './routes/Lista'
import Detalhes from './routes/Detalhes'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="header">
          <Link to='/'><h2>Grocery Helper</h2></Link>
        </header>
        <Route path="/" exact component={Lista} />
        <Route path="/detalhes/:id" component={Detalhes} />
      </BrowserRouter>
    </div>
  )
}

export default App
