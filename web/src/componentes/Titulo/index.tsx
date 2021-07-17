import React from 'react';
import './styles.css';

function Titulo (props: { titulo: any; }) {

  let titulo = props.titulo;
  return (
    <div className="titulo-container">
      <h3> {titulo} </h3>
    </div>
  );
}

export default Titulo;