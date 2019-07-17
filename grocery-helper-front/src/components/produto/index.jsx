import React from 'react'

import { Link } from 'react-router-dom'

// import { Container } from './styles';

export default function produto(props) {
  return (
    <li className="produto">
      <Link to={`/detalhes/${props.id}`}>
        {props.nome}
      </Link>
    </li>
  )
}
