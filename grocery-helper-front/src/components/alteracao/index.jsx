import React from 'react';

// import { Container } from './styles';

export default function alteracao(props) {
  return (
    <div className="alteracao">
      <p>{props.data.toISOString().slice(0, 10)}</p>
      <p>{props.quantidade}</p>
    </div>
  );
}

/**
 * Fazer transição de elementos para haver um componente "alteração"
 */