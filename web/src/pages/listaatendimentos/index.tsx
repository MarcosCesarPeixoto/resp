import React, { useEffect, useState }  from 'react';
import { useLocation } from "react-router-dom";

import api from '../../services/api';

import Cabecalho from '../../componentes/Cabecalho';
import Destaque from '../../componentes/Destaque';
import OrganizacaoDados from '../../componentes/OrganizacaoDados';
import AtendimentoItem, { Atendimento } from '../../componentes/AtendimentoItem';

export interface Organizacao {
  id_org: number;
  razaosocial_org: string;
  endereco_org: string;
  complemento_org: string;
  numero_org: string;
  bairro_org: string;
  cep_org: string;
  cidade_org: number;
  descricao_cidade_org: string;
  uf_org: string;
  telefone_org: string;
  celular_org: string;
  logomarca_org: string;
}

const ListaAtendimentos: React.FC = () => {
  const titulo = "Selecione o atendimento desejado"; 
  const { state }  = useLocation<Organizacao>();
  const [atendimentos, setAtendimentos] = useState([]); // Criando uma lista vazia 

  async function buscaAtendimentos() {
    const response = await api.get('atendimentos' , {
      params: {
        organizacao_atd: state.id_org
      }
    });
    setAtendimentos(response.data);
  }

  useEffect(() => {
      buscaAtendimentos();
  }, []);

  return (
    <div>      
      <Cabecalho />
      <OrganizacaoDados organizacao={ state } /> 
      <Destaque titulo={titulo} /> 
      <form id="lista-atendimentos" >
        <main>        
          {atendimentos.map((atendimento: Atendimento) => {
            return <AtendimentoItem key={atendimento.id_atd} atendimento={atendimento}  />;
          })}
        </main>
      </form>
    </div>
  );
}

export default ListaAtendimentos;