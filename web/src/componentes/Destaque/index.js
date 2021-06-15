import React from 'react';
import './styles.css';

function Destaque (props) {

  let titulo = props.titulo;
  return (
    <div className="destaque-container">
      <h3> {titulo} </h3>
    </div>
  );
}

export default Destaque;