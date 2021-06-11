import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';

import api from '../../services/api';

import Cabecalho from '../../componentes/Cabecalho';
import OrganizacaoItem, { Organizacao } from '../../componentes/OrganizacaoItem';

import '../../assets/styles/global.css';
import './styles.css';

// ----- imagens -----
import search from '../../assets/images/search.png';
import btnVoltar from '../../assets/images/voltar_blue.png';
import Rodape from '../../componentes/Rodape';


function ListaOrganizacoes ()  { 

  const [organizacoes, setOrganizacoes] = useState([]); // Criando uma lista vazia 

  const [subject, setSubject] = useState(''); 

  async function buscaOrganizacoes(e: FormEvent) {
    e.preventDefault(); // evita recarregamento da página

    // Monta o link do que deve ser buscado
    let conteudoDeBusca = '';
    if(subject){
      conteudoDeBusca = 'organizacoes?conteudo_busca=' + subject;
    } else {
      conteudoDeBusca = 'organizacoes';
    }

    const response = await api.get(conteudoDeBusca , {
      params: {
        subject
      }
    });

    // console.log(response.data);
    setOrganizacoes(response.data); // obtendo a lista de organizações retornada
    
  }
  
  return (
    <div>
      <Cabecalho />

      <div id="page-lista-organizacoes" className="container-lista-organizacao">
          <div className="container-pesquisa-organizacao">            
            <form id="busca-organizacoes" onSubmit={buscaOrganizacoes}>
              <input 
                type="text" 
                id="txtBusca" 
                className="txtBusca-organizacao" 
                placeholder="Informe a empresa ou atendimento desejado..." 
                value={subject} 
                onChange={e => { setSubject(e.target.value) }} 
              />

              <button type="submit">Pesquisar</button> 

            </form>
            <img src={search} id="btnBusca" className="btnBusca" alt="Buscar"/>
          </div>

        <main>
          {organizacoes.map((organizacao: Organizacao) => {
            return <OrganizacaoItem key={organizacao.id_org} organizacao={organizacao}  />;
          })}
          {/* <OrganizacaoItem />
          <OrganizacaoItem />
          <OrganizacaoItem /> */}
        </main>
      </div>
    </div>
  );
}

export default ListaOrganizacoes;