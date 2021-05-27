import React from 'react'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';

import Principal from '../principal';
import btnVoltar from '../../assets/images/voltar_blue.png';

import './styles.css';

import search from '../../assets/images/search.png';
import logoImg from '../../assets/images/mao.png';
import logoOrg5 from '../../assets/images/lixo/logo2.jpg';

function ListaOrganizacoes() {

  return (
    <div>
      <Principal />
      <div id="page-lista-organizacoes" className="container">
        <header className="page-header">
    
          <div className="pesquisa-container">

            {/* <div className="botoes-topo-container">
              <Link to="/">
                <img src={btnVoltar} alt="Voltar" />
              </Link>
            </div> */}

            <div id="divBusca">
              <input type="text" id="txtBusca" placeholder="Informe a empresa ou atendimento desejado..."/>
              <img src={search} id="btnBusca" alt="Buscar"/>
            </div>

            <main>
              <article className="organizacao-item">
                <header>
                  <img src={logoOrg5} alt="logo"/>
                  <div>
                    <strong>Mara Studio</strong>
                    <span>Endereço da organização ou empresa</span>
                  </div>
                </header>

                <footer>

                </footer>
              </article>
            </main>

          </div>

        </header>
      </div>
    </div>
  )
}

export default ListaOrganizacoes;