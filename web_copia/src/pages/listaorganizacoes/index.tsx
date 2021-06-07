import React from 'react'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';

import Principal from '../principal';
import btnVoltar from '../../assets/images/voltar_blue.png';

import search from '../../assets/images/search.png';
import OrganizacaoItem from '../../componentes/OrganizacaoItem';
import Rodape from '../../componentes/Rodape';

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
              <OrganizacaoItem />
              <OrganizacaoItem />
              <OrganizacaoItem />
              <OrganizacaoItem />
                            
            </main>
          </div>

        </header>
      </div>

      {/* <Rodape /> */}

    </div>
  )
}

export default ListaOrganizacoes;