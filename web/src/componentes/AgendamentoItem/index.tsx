import React from "react";
import { useHistory } from "react-router";

// import { parseISO, isAfter, format } from 'date-fns';

import './styles.css';
// import Organizacao from "../../pages/organizacao";

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

  id_atd: number;
  descricao_atd: string;
  valor_atd: number;
}

interface AgendamentoItemProps {
  agendamento: Agendamento;
}

const AgendamentoItem: React.FC<AgendamentoItemProps> = ({ agendamento }) => {

  const history = useHistory();
 
  var data = new Date(agendamento.data_agend);
  var dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

  // const endereco = {agendamento.endereco_org} + ', ' + {agendamento.numero_org} - {agendamento.complemento_org};
  const endereco_concatenado = agendamento.endereco_org + ',' + agendamento.numero_org + ' ' + agendamento.complemento_org + ' - ' + agendamento.bairro_org;
  const descricao_cidade_concatenado = agendamento.descricao_cidade_org + '-' + agendamento.uf_org + ' ' + agendamento.cep_org;

  let descricao_status;
  switch (agendamento.status_agend) {
    case 0:
      descricao_status = 'Aguarde';
        break;
    case 1:
      descricao_status = 'Confirmado';
      break;
    case 2:
      descricao_status = 'Recusado';
      break;
    case 3:
      descricao_status = 'Cancelado';
      break;
    case 4:
      descricao_status = 'Em Andamento';
      break;
    case 5:
      descricao_status = 'Realizado';
      break;
    case 6:
      descricao_status = 'Novo Agendamento';
      break;
  }  

  return (
    <div className="agendamento-item">
      <header>  
        <div>
          <div id="dados-agendamento-item">
            <div id="data-agendamento">{dataFormatada}</div>
            <div id="hora-agendamento">{agendamento.hora_agend}</div>
            <div id="razaosocial-agendamento">{agendamento.razaosocial_org}</div>
            <div id="telefone-agendamento"> {agendamento.telefone_org} </div>
            <div id="telefone-agendamento"> {agendamento.celular_org} </div>
            <div id="status"> Status: {descricao_status} </div>                      
            {/* <div > descrocao do atendimento {descricao_atd} </div> */}
            {/* <div > descrocao do atendimento </div> */}
          </div>  

          {/* <div id="telefones-agendamento-item"> */}
            {/* <div id="status"> Status: {descricao_status} </div>           */}
            {/* <div id="telefone-agendamento"> {agendamento.telefone_org} </div>  */}
            {/* <div id="telefone-agendamento"> {agendamento.celular_org} </div> */}
          {/* </div> */}

          <div id="endereco-agendamento-item"> 
            <div>  {endereco_concatenado} </div> 
            <div> {descricao_cidade_concatenado} </div>
          </div>

        </div>
      </header>
    </div>
  );
}

export default AgendamentoItem;
