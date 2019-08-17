import React from 'react'

import { ListGroup } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const styles = {
  color: 'black'
}

export default function produto(props) {
  return (
    <Link to={`/detalhes/${props.id}`} style={styles}>
      <ListGroup.Item>
        {props.nome}
      </ListGroup.Item>
    </Link>
  )
}
