import React from 'react'

import { ListGroup } from 'react-bootstrap'

import { Link } from 'react-router-dom'

// import { Container } from './styles';

export default function produto(props) {
  return (
    <Link to={`/detalhes/${props.id}`}>
      <ListGroup.Item>
        {props.nome}
      </ListGroup.Item>
    </Link>
  )
}
