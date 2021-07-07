import React, { FormEvent, useEffect, useState } from 'react';
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

export interface Horario {
  hora: string;
  disponivel: string;
}

interface AtendimentoItemProps {
  atendimento: Atendimento;
}

const CadastroAgendamento: React.FC<AtendimentoItemProps> = ({atendimento}) => {
  
  const horarios = [
    { hora: '08:00', disponivel: "N"},
    { hora: '08:30', disponivel: "S"},
    { hora: '09:00', disponivel: "S"},
    { hora: '09:30', disponivel: "S"},
    { hora: '10:00', disponivel: "N"},
    { hora: '10:30', disponivel: "S"}
  ]  
  
  const history = useHistory();  
  const { state } = useLocation<Atendimento>();
  // const [atendimentos, setAtendimentos] = useState([]); // Criando uma lista vazia    
  // const history = useHistory();
  
  const [showHorarios, setShowHorarios] = React.useState(false);
  const [usuario_agend, setUsuarioAgend] = useState(1); //Marcos - corrigir com autenticação
  const [organizacao_agend, setOrganizacaoAgend] = useState(state.organizacao_atd);
  const [atendimento_agend, setAtendimentoAgend] = useState(state.id_atd);  
  const [descricao_atd,     setDescricaoAtd]     = useState(state.descricao_atd);
  const [colaborador_agend, setColaboradorAgend] = useState(0);
  const [data_agend, setStateData] = useState('');
  const [hora_agend, setHoraAgend] = useState('');
  const [status_agend, setStatusAgend] = useState(0);
  const [observacao_agend, setObservacaoAgend] = useState('');
  const [agend_anterior_agend, setAgendAnteriorAgend] = useState(0);

  //const [agendamentosNaData, setAgendamentosNaData] = useState([]); // Criando uma lista vazia de agendamentos

  function buscarHorarios() {
    console.log('clicou no botão buscar: ' + data_agend);
    buscarAgendamentosNaData( );
    // console.log(agendamentosNaData);
    
    setShowHorarios(true);
  }

  async function buscarAgendamentosNaData() {
    const response = await api.get('agendamentos' , {
      params: {        
        data_agend: data_agend,
        organizacao_agend: state.organizacao_atd,
      }
    });
    // setAgendamentosNaData(response.data);
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
    // const history = useHistory();

    console.log({
      data_agend,
      hora_agend,
      atendimento_agend 
    });
   
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
    }).then(() => {
      alert('Agendamento realizado com sucesso!');
      history.push('/listaatendimentos');
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

  // useEffect(() => {
  //   buscaAtendimentos();
  // }, []);

  function handleChangeData(e: React.ChangeEvent<HTMLInputElement>) {
    let data = e.target.value;
    setStateData(data);
    setShowHorarios(true); 
  }

  // function handleChangeHora() {
  //   console.log('no handleChangeHora')
  //   setShowHorarios(false);
  //   console.log(showHorarios);
  //   <ShowHorariosDisponiveis />
  // }

  function HorariosDisponiveis() {
    return(
      showHorarios ? 
        <div className="input-block">
          <Button 
            type="button" 
            variant="contained" 
            color="primary"
            style={{ borderRadius: 50 }} 
            className="botao" 
            onClick={buscarHorarios}>
            Ver Horários 
          </Button> 
        </div> 
      : 
        null 
    )
  }

  function ShowHorariosDisponiveis() {
    return(
      showHorarios ? 
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
      {/* {state.descricao_atd}  */}
      {/* {atendimento_agend} */}
      {/* Organizacao {organizacao_agend}<br></br> */}

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
                // onChange={(e) => { setNomeUsuario(e.target.value) }}
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
                // onChange={(e) => { setDataAgend(e.target.value) }} // funcional
                onChange={ handleChangeData }
              /> 
              {/* <Button type="button" variant="contained" color="primary" style={{ borderRadius: 50 }} className="botao" > */}
            </div>  

             <ShowHorariosDisponiveis />

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
                // onChange={(e) => { setShowHorarios(false); }}
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



// CREATE TABLE "agendamento" (
// 	"id_agend"	INTEGER NOT NULL UNIQUE,
// 	"usuario_agend"	INTEGER NOT NULL,
// 	"organizacao_agend"	INTEGER NOT NULL,
// 	"atendimento_agend"	INTEGER NOT NULL,
// 	"colaborador_agend"	INTEGER,
// 	"data_agend"	REAL,
// 	"hora_agend"	REAL NOT NULL,
// 	"status_agend"	INTEGER NOT NULL,
// 	"observacao_agend"	BLOB,
// 	"agend_anterior_agend"	INTEGER,
// 	"dh_criacao_agend"	REAL NOT NULL DEFAULT CURRENT_TIMESTAMP,
// 	"dh_atualizacao_agend"	REAL NOT NULL DEFAULT CURRENT_TIMESTAMP,
// 	PRIMARY KEY("id_agend" AUTOINCREMENT),
// 	FOREIGN KEY("agend_anterior_agend") REFERENCES "agendamento"("id_agend"),
// 	FOREIGN KEY("organizacao_agend") REFERENCES "organizacao"("id_org"),
// 	FOREIGN KEY("usuario_agend") REFERENCES "usuario"("id_usu"),
// 	FOREIGN KEY("atendimento_agend") REFERENCES "atendimento"("id_atd"),
// 	FOREIGN KEY("colaborador_agend") REFERENCES "colaborador"("id_colab")
// )