import { Button, createMuiTheme, ThemeProvider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import Cabecalho from '../../componentes/Cabecalho';

import './styles.css';

import imgSucessoAgendamento from '../../assets/images/calendar_sucess.png';
import imgCalendar from '../../assets/images/calendar.png';
import imgClock from '../../assets/images/clock.png';
import { useHistory } from 'react-router-dom';

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

const ConfirmacaoAgendamento = (props: any) => {

  const [id, setId] = useState("");  
  const [descricao_org, setDescricaoOrg] = useState("");
  const [descricao_atd, setDescricaoAtd] = useState("");  
  const [data_agend, setDataAgendamento] = useState("");  
  const [hora_agend, setHoraAgendamento] = useState("");  

  const history = useHistory(); 

  useEffect(() => {
    // Recebendo informações passadas - acessa com mesmo nome que foi setado no componente que enviou
    setId(props.location.state.id);
    setDescricaoOrg(props.location.state.descricao_org);
    setDescricaoAtd(props.location.state.descricao_atd);
    setDataAgendamento(props.location.state.data_agend);
    setHoraAgendamento(props.location.state.hora_agend);
  }, []);

  const handleRedirecionar = () => { 
    history.push('/listaorganizacoes');
  } 

  return (
    <div>
      <Cabecalho />      

      <div className="container-confirmacaoagendamento">
        
        <img className="imgSucessoAgendamento" src={imgSucessoAgendamento} alt="Sucesso Agendamento"/>
        <div className="mensagem-confirmacaoagendamento">Agendamento efetuado com sucesso!</div>

        <div className="txt8-confirmacaoagendamento">Protocolo do Agendamento: {id}</div>

        <div className="txt-confirmacaoagendamento">
          <div>Local: {descricao_org}</div>
          <div>{descricao_atd}</div>
        </div>

        <div className="datahora-confirmacaoagendamento">
          <img src={imgCalendar} alt="Calendário"/>
          <div>{data_agend}</div>
        </div>

        <div className="datahora-confirmacaoagendamento">
          <img src={imgClock} alt="Horário"/> 
          <div>{hora_agend}</div>
        </div>

        <div className="input-block">
          <br></br>
          <ThemeProvider theme={theme}>
            <Button type="button" variant="contained" color="primary" style={{ borderRadius: 50 }} className="botao" onClick={ handleRedirecionar }>
              Fechar
            </Button>
          </ThemeProvider> 
        </div>  
      </div> 
    </div>
  );

}

export default ConfirmacaoAgendamento; 
