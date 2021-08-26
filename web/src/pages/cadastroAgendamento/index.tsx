import React, { FormEvent, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Atendimento } from '../../componentes/AtendimentoItem';  
import Cabecalho from '../../componentes/Cabecalho';

import api from '../../services/api';

import '../../assets/styles/global.css';
import './styles.css';
import { Button, createMuiTheme, TextField, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#228B22',
      dark: '#006400',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const horariospadroes = [
  { hora: '08:00', disponivel: "S"},
  { hora: '08:30', disponivel: "S"},
  { hora: '09:00', disponivel: "S"},
  { hora: '09:30', disponivel: "S"},
  { hora: '10:00', disponivel: "S"},
  { hora: '10:30', disponivel: "S"}
]  

let horarios = horariospadroes;

export interface Horario {
  hora: string;
  disponivel: string;
}

interface AtendimentoItemProps {
  atendimento: Atendimento;
}

export interface Agendamento {
  usuario_agend: number;
  organizacao_agend: number;
  atendimento_agend: number;
  colaborador_agend: number;
  data_agend: string;
  hora_agend: string;
  status_agend: number;
  observacao_agend: string;
  agend_anterior_agend: string;
}

// interface AgendamentoItemProps {
//   agendamento: Agendamento;
// }

const CadastroAgendamento: React.FC<AtendimentoItemProps> = ({atendimento}) => {
  
  const history = useHistory();  
  const { state } = useLocation<Atendimento>();
      
  const [showHorarios, setShowHorarios] = React.useState(false);  
  const [usuario_agend, setUsuarioAgend] = useState(1); //Marcos - corrigir com autenticação
  const [organizacao_agend] = useState(state.organizacao_atd);
  const [razaosocial_org]   = useState(state.razaosocial_org);  
  const [atendimento_agend] = useState(state.id_atd);  
  const [descricao_atd]     = useState(state.descricao_atd);
  const [colaborador_agend, setColaboradorAgend] = useState(0);
  const [data_agend, setStateData] = useState('');
  const [hora_agend, setHoraAgend] = useState('');
  const [status_agend] = useState(0);
  const [observacao_agend, setObservacaoAgend] = useState('');
  const [agend_anterior_agend] = useState(0);

  const [agendamentosNaData, setAgendamentosNaData] = useState([]); // Criando uma lista vazia de agendamentos

  async function buscarAgendamentosNaData(data: string) {
    setAgendamentosNaData([]);

    const response = await api.get('agendamentos', {
      params: { 
        data_agend: data,
        organizacao_agend: state.organizacao_atd,
      }
    });

    // Postar no stackOverFlow - Pq se passar "horarios = await atualizarHorariosDisponiveis(agendamentosNaData);" fica desatualizado, sempre um registro atrás o processamento
    setAgendamentosNaData(response.data); 
    horarios = atualizarHorariosDisponiveis(response.data);
    // outra postagem, porque se colocar "horarios = await atualizarHorariosDisponiveis(response.data);" dá mensagem: 'await' has no effect on the type of this expression

    return true;
  }
  
  function atualizarHorariosDisponiveis(data: any) {    
    // Percorre o objeto com os horários padrões setando disponível false se já estiver agendamento para ele
    let horariosret = horariospadroes;

    horariosret.map((horario, index) => {
      horario.disponivel = 'S';
      
      data.map((agendamento: Agendamento) => { 
        if(horario.hora === agendamento.hora_agend) {
          horario.disponivel = 'N'; 
        }
        return horario;
      });
      return horario;
    });

    return horariosret;
  }

  interface HorariosProps {
    hora: string;
    disponivel?: string;
  }

  const Horarios: React.FC<HorariosProps> = (props) => {
    let horarioRenderizado;
    if (props.disponivel==="S"){
      horarioRenderizado = 
        <div className="horario-item" style={{ color:"#FFFFFF" }} onClick={(e) => { setHoraAgend( props.hora ) }} >
          {props.hora}
        </div>;
    } else {
      horarioRenderizado = 
        <div style={{ color:"#FFFFFF", background:"#C7B7B7", cursor:"none", textDecoration:"line-through" }} className="horario-item" >
          {props.hora}
        </div>;
    }
  
    return(
      <div>
        { horarioRenderizado }
      </div>  
    );
  }
  
  function handleIncluirAgendamento(e: FormEvent ) {
    e.preventDefault(); // evita ficar recarregando a página (para isso tem que passar o e: FormEvent)

    if ((!data_agend) || (!hora_agend)) {
      alert('Data e Hora precisam ser preenchidos!');
      return;
    }
   
    api.post('agendamentos', {
      usuario_agend,
      organizacao_agend,
      atendimento_agend,
      colaborador_agend,
      data_agend,
      hora_agend,
      status_agend,
      observacao_agend,
      agend_anterior_agend
    }).then((response) => {     
      console.log(response.data);
      console.log(response.data.id);
      
      history.push({
        pathname: '/confirmacaoagendamento/',
        state: { 
          id: response.data.id,
          descricao_org: razaosocial_org,
          descricao_atd: descricao_atd,
          data_agend: data_agend,
          hora_agend: hora_agend,
        }
      });

    }).catch((error) => { 
      if (error.response){
        alert('Erro ao tentar realizar agendamento: ResponseError = ' + error.response);
      } else if(error.request){
        alert('Erro ao tentar realizar agendamento: RequestError = ' + error.response.request._response);
      }else if(error.message){
        alert('Erro ao tentar realizar agendamento: MessageError = ' + error.message);
      }
    });
  }

  async function handleChangeData(e: React.ChangeEvent<HTMLInputElement>) {
    setAgendamentosNaData([]);
    setShowHorarios(false); 

    let data = e.target.value;
    let pronto = false;

    setStateData(data);
    
    pronto = await buscarAgendamentosNaData(data);
    if(pronto) {
      setShowHorarios(true); 
   }
  }
 
  function ShowHorariosDisponiveis(props: any) {
    return(
      props.showHorarios ? 
      <div className="horario-container">
        {horarios.map((horario) => {
            return <Horarios hora={horario.hora} disponivel={horario.disponivel} />;
          })}
      </div> 
      : 
      null 
    );
  }

  return (
    <div id="cadastro-agendamento" className="container-cadastroagendamento">
      <Cabecalho />

      <main className="container-cadastroagendamento">
        <form onSubmit={handleIncluirAgendamento}>
          <fieldset className="container-form">
            <h2 className="titulo">Agendamento</h2>

            <div className="input-block" >
              <TextField 
                id="atendimento_agend" 
                label="Atendimento" 
                value={descricao_atd}
                type="text" 
                fullWidth 
              /> 
            </div>

            <div className="input-block">
              <TextField
                id="data_agend"
                name="data_agend"
                label="Data do Atendimento"
                type="date"
                defaultValue=""
                value={data_agend} 
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={ handleChangeData }
              /> 
            </div>  

             <ShowHorariosDisponiveis showHorarios={showHorarios}/>

            <div className="input-block">
              <TextField
                id="hora_agend"
                name="hora_agend"
                label="Horário"
                type="time"
                defaultValue=""
                value={hora_agend} 
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 900, // 5 min
                }}
              /> 
            </div>  

            <div className="input-block">
              <br></br>
              <ThemeProvider theme={theme}>
                <Button type="submit" variant="contained" color="primary" style={{ borderRadius: 50 }} className="botao" >
                  Confirmar
                </Button>
              </ThemeProvider>
            </div>

          </fieldset>
        </form>
      </main>
    </div>
  );
};

export default CadastroAgendamento;
