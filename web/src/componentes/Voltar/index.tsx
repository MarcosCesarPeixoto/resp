import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import btnVoltar from '../../assets/images/voltar.png';
import './styles.css';

function Voltar (props: { titulo: string }) {

  let titulo = props.titulo;

  const history = useHistory();
  function goBack(){
      history.goBack();
  }  

  return(
    <div className="container-voltar-mensagem">
      <img className="button_voltar" src={btnVoltar} onClick={goBack} alt = "voltar"></img>      
      <div className="titulo-container">
        <h3> {titulo} </h3>
      </div>
    </div>      
  );    
}

export default Voltar;