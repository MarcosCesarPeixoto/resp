import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';

import Cabecalho from "../../componentes/Cabecalho";

import AgendamentoItem, { Agendamento } from '../../componentes/AgendamentoItem';

import './styles.css';

import { createMuiTheme, createStyles, makeStyles, Theme } from "@material-ui/core";
import Titulo from "../../componentes/Titulo";
import api from "../../services/api";

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

const useStyles = makeStyles((theme2: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

const ListaAgendamentosDados = (props: any) => {  

  const [agendamentos, setAgendamentos] = useState([]); // Criando uma lista vazia 
  const location = useLocation();
  
  useEffect(() => {
    setAgendamentos(props.location.state);  
  }, []);
  
  return (
    <div>
      <form id="buscar-lista-agendamentos">

        <Cabecalho />
        <Titulo titulo="Lista de Agendamentos" />;

        <div id="page-lista-agendamentos" className="container-lista-agendamentos">
          <main>
            <Voltar />

            {agendamentos.map((agendamento: Agendamento) => {
              return <AgendamentoItem key={agendamento.id_agend} agendamento={agendamento} />;
            })}

            {agendamentos.length > 10 && <Voltar /> }

          </main>
        </div>
      </form>
    </div>
  );
}

const Voltar = () => {
  const history = useHistory();
  function goBack(){
      history.goBack();
  }  
  return(
      <button id="button-voltar-agendamento" type="button" onClick={goBack}>
        VOLTAR
      </button>
  );    
}

export default ListaAgendamentosDados;
