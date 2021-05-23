import React from 'react';
import logoImg from '../../assets/images/resp_logo.png';

import './styles.css';

function Principal() {
  return (
    <div id="page-principal">

      <div id="page-principal-content" className="container">
        <nav >

          <div className="container-logo">
            <img src={logoImg} alt="Resp"/>
          </div>

          <div className="container-text">
            <div id="usuario">
              <span>Usuário</span>
            </div>

            <div id="nome_usuario">
              <span>Nome do Usuário Logado</span>
            </div>
            
            {/* <div id="Sair">
              <a href="url">Sair</a>
            </div> */}
          </div>
        </nav>
      </div>


      <nav id="menu-h">
        <ul>
            <li><a href="url">Meus Agendamentos</a></li>
            <li><a href="url">Principal</a></li>
            <li><a href="url#">Meu Cadastro</a></li>
            <li><a href="url">Contato</a></li>
            <li><a href="url">Entrar</a></li>
        </ul>
      </nav>



    </div>

  );
}

export default Principal;