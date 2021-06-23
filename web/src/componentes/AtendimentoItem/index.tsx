import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

export interface Atendimento {
  id_atd: number;
  tipo_atd: number;
  descricao_atd: string;
  descricao_detalhada_atd: Blob;
  usuario_escolhe_atd: number;
  cobrado_atd: number;
  valor_atd: number;
  comissão_atd: number;
  tempo_estimado_atd: number;
  horario_padrao_inicio_atd: number;
  horario_padrao_fim_atd: number;
  imagem_atd: string;
  organizacao_atd: number;
  ativo_atd: number;
}

interface AtendimentoItemProps {
  atendimento: Atendimento;
}

const AtendimentoItem: React.FC<AtendimentoItemProps> = ({ atendimento }) => {

  let ExibirValor = (atendimento.cobrado_atd);

  const history = useHistory();

  const redirectCadastroAgendamento = () => {
    console.log('redirect');
    // history.push('/cadastroagendamento');
   }

  // const redirectCadastroAgendamento = () => { 
  //   history.push({
  //     pathname: '/cadastroagendamento',
  //     search: '?id_org=' + organizacao.id_org,
  //     state: { id_org: organizacao.id_org,
  //              razaosocial_org: organizacao.razaosocial_org,
  //              endereco_org: organizacao.endereco_org,
  //              complemento_org: organizacao.complemento_org,
  //              numero_org: organizacao.numero_org,
  //              bairro_org: organizacao.bairro_org,
  //              cep_org: organizacao.cep_org,
  //              cidade_org: organizacao.cidade_org,
  //              descricao_cidade_org: organizacao.descricao_cidade_org,
  //              uf_org: organizacao.uf_org,
  //              telefone_org: organizacao.telefone_org,
  //              celular_org: organizacao.celular_org,
  //              logomarca_org: organizacao.logomarca_org 
  //            }
  //   });
  // }

  return (

    <div className="atendimento-item" onClick={redirectCadastroAgendamento}>
      <header>
        {/* <div className="atendimento-item" onClick={redirectAgendamento}> */}

        {/* {ExibirLImgAtendimento && <img src={atendimento.imagem_atd} alt={atendimento.descricao_atd}/>} */}
        <img src={atendimento.imagem_atd} alt={atendimento.descricao_atd}/>         
        <div id="atendimento-descricao">
          <strong>{atendimento.descricao_atd}</strong><br></br>
          <span id="atendimento-descricao-detalhada">{atendimento.descricao_detalhada_atd}</span>
        </div>

        <div id="atendimento-valor">
          {/* <strong>R$ {atendimento.valor_atd}</strong> */}
          {ExibirValor && <strong>R$ {atendimento.valor_atd}</strong>}
        </div>

      </header>
    </div>
  )
}

export default AtendimentoItem;