import React from 'react';
import logoImg from '../../assets/images/resp_logo.png';

import './styles.css';

function Cabecalho() {

  return (

    <div id="page-principal">

      <div id="page-principal-content" className="container">
        <nav className="container-cabecalho">
          
          <img src={logoImg} alt="Resp"/>

          <div className="container-text">
            <div id="usuario">
              <span>Usuário</span>
            </div>

            <div id="nome_usuario">
              <span>Nome do Usuário Logado</span>
            </div>
            
            <div id="Sair" className="button-sair">
              <br></br>
              <a href="url">Sair</a>
            </div>
          </div>
        </nav>
      </div>

      <nav id="menu-h" className="container-menu">
        <ul>
            <li><a href="url">Meus Agendamentos</a></li>
            <li><a href="url">Principal</a></li>
            <li><a href="url#">Meu Cadastro</a></li>
            <li><a href="url">Contato</a></li>
            <li><a href="url">Entrar</a></li>
        </ul>
      </nav>
    </div>

    // <div id="page-principal">

    //   <div id="page-principal-content" className="container">
    //     <nav>
    //       <div className="container-logo">
    //         <img src={logoImg} alt="Resp"/>
    //       </div>

    //       <div className="container-text">
    //         <div id="usuario">
    //           <span>Usuário</span>
    //         </div>

    //         <div id="nome_usuario">
    //           <span>Nome do Usuário Logado</span>
    //         </div>
            
    //         <div id="Sair" className="button-sair">
    //           <br></br><br></br>
    //           <a href="url">Sair</a>
    //         </div>
    //       </div>
    //     </nav>
    //   </div>

    //   <nav id="menu-h">
    //     <ul>
    //         <li><a href="url">Meus Agendamentos</a></li>
    //         <li><a href="url">Principal</a></li>
    //         <li><a href="url#">Meu Cadastro</a></li>
    //         <li><a href="url">Contato</a></li>
    //         <li><a href="url">Entrar</a></li>
    //     </ul>
    //   </nav>

    // </div>
  );

};

export default Cabecalho;

