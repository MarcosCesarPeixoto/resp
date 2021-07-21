import React from "react";
import { useHistory } from "react-router";

// import ReactDOM from 'react-dom';
// import TabelaAgendamento from '../../componentes/TabelaAgendamentos';

import { parseISO, isAfter, format } from 'date-fns';

import './styles.css';
import Organizacao from "../../pages/organizacao";

export interface Agendamento {
  id_agend: number;
  usuario_agend: number;
  organizacao_agend: number;
  atendimento_agend: number;
  colaborador_agend: number;
  data_agend: string;
  hora_agend: string;
  status_agend: number;
  observacao_agend: string;
  agend_anterior_agend: string;
  dh_criacao_agend: string;
  dh_atualizacao_agend: string;

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

interface AgendamentoItemProps {
  agendamento: Agendamento;
}

const AgendamentoItem: React.FC<AgendamentoItemProps> = ({ agendamento }) => {

  const history = useHistory();

  // var dataagend = new Date({agendamento.data_agend)
  // let dataagend = ({agendamento.data_agend}).getDate() ;
  // const date = '2018-04-01';
  // const date = agendamento.data_agend.toString;
  // const date = new Date(‘2019/01/01’);
  // const dataformatada = format(date, 'MM/DD/YYYY');
  // const parsedDate = parseISO(date);
  // const past = isAfter(parsedDate, new Date()); // true
  
  var data = new Date(agendamento.data_agend);
  var dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

  return (
    <div className="agendamento-item">
      <header>  
        {/* <TabelaAgendamento />     */}
        <div>
          <strong>
            {dataFormatada} {agendamento.hora_agend} {agendamento.razaosocial_org} 
          </strong>
          <div>
            {agendamento.endereco_org} {agendamento.complemento_org} {agendamento.numero_org} {agendamento.bairro_org}  
            {agendamento.descricao_cidade_org}-{agendamento.uf_org} {agendamento.cep_org}   
            {agendamento.telefone_org} {agendamento.celular_org} 
          </div>
          {/* <strong>{agendamento.organizacao_agend}</strong> */}
          {/* <span>
          </span> */}
        </div>
      </header>
    </div>
  );
}

export default AgendamentoItem;
