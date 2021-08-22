import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../pages/cadastroAgendamento';
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
    history.push({
      pathname: '/cadastroagendamento',
      state: {
        id_atd: atendimento.id_atd,
        tipo_atd: atendimento.tipo_atd,
        descricao_atd: atendimento.descricao_atd,
        descricao_detalhada_atd: atendimento.descricao_detalhada_atd,
        usuario_escolhe_atd: atendimento.usuario_escolhe_atd,
        cobrado_atd: atendimento.cobrado_atd,
        valor_atd: atendimento.valor_atd,
        comissão_atd: atendimento.comissão_atd,
        tempo_estimado_atd: atendimento.tempo_estimado_atd,
        horario_padrao_inicio_atd: atendimento.horario_padrao_fim_atd,
        horario_padrao_fim_atd: atendimento.horario_padrao_fim_atd,
        imagem_atd: atendimento.imagem_atd,
        organizacao_atd: atendimento.organizacao_atd,
        ativo_atd: atendimento.ativo_atd
      }
    });
   }

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
          {ExibirValor && <strong>R$ {atendimento.valor_atd}</strong>}
        </div>

      </header>
    </div>
  )
}

export default AtendimentoItem;