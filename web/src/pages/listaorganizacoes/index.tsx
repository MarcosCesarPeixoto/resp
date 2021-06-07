import React from 'react'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';

import Cabecalho from '../../componentes/Cabecalho';
import OrganizacaoItem from '../../componentes/OrganizacaoItem';

import '../../assets/styles/global.css';
import './styles.css';

// ----- imagens -----
import search from '../../assets/images/search.png';
import btnVoltar from '../../assets/images/voltar_blue.png';
import Rodape from '../../componentes/Rodape';

function ListaOrganizacoes() {

  return (

    <div>
      <Cabecalho />

      <div id="page-lista-organizacoes" className="container-lista-organizacao">
          <div className="container-pesquisa-organizacao">            
            <div >
              <input type="text" id="txtBusca" className="txtBusca-organizacao" placeholder="Informe a empresa ou atendimento desejado..."/>
            </div>
            <img src={search} id="btnBusca" className="btnBusca" alt="Buscar"/>
          </div>

        <main>
          <OrganizacaoItem />
          <OrganizacaoItem />
          {/* <OrganizacaoItem />
          <OrganizacaoItem /> */}
        </main>
      </div>
    </div>
  )
}

export default ListaOrganizacoes;