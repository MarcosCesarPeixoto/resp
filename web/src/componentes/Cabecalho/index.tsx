import React from 'react';
import logoImg from '../../assets/images/resp_logo.png';
import { Link } from 'react-router-dom';

import './styles.css';

function Cabecalho() {

  return (

    <div id="page-principal">

      <div id="page-principal-content" className="container">
        <nav className="container-cabecalho">
          
          <img src={logoImg} alt="Resp"/>

          <div className="container-text">
            <div id="usuario">
              <span>Usuário:</span>
            </div>

            <div id="nome_usuario">
              <span>Carlos Drumond de Andrade</span>
            </div>
            
            <div id="Sair" className="button-sair">
              <br></br>
              <br></br>
              {/* <a href="url">Sair</a> */} 
            </div>
          </div>
        </nav>
      </div>

      <nav id="menu-h" className="container-menu">
        <ul>
            <li><Link to="/listaagendamentos">Meus Agendamentos</Link></li>
            <li><Link to="/listaorganizacoes">Buscar Atendimentos</Link></li>
            <li><a href="url#">Meu Cadastro</a></li>
            <li><a href="url">Contato</a></li>
            <li><a href="/login">Entrar</a></li>
        </ul>
      </nav>
    </div>
  );

};

export default Cabecalho;

