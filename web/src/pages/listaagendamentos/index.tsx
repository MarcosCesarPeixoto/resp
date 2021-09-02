import React, { FormEvent, useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Cabecalho from "../../componentes/Cabecalho";

// import AgendamentoItem, { Agendamento } from '../../componentes/AgendamentoItem';

import './styles.css';

import { createMuiTheme, createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import Voltar from "../../componentes/Voltar";
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

function ListaAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]); // Criando uma lista vazia de agendamentos
  
  const [getNumerado] = useState(1); 
  const [usuario_agend, setUsuarioAgend] = useState(1);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');  
  const [status, setState] = useState({
    Aguardando: true,
    Confirmado: true,
    Realizado: true
  });


  useEffect(() => {
    const nome_usuario = localStorage.getItem('@resp/nomeusuario');
    const id_usuario = JSON.parse(localStorage.getItem('@resp/idusuario') || '{}');
    console.log(id_usuario);

    const estaLogado = (nome_usuario !== null);
    if (estaLogado) {
      let idusuario = parseInt(id_usuario);
      setUsuarioAgend(idusuario);
    } else {
      history.push({
        pathname: '/login2',
        state: {
          path_retorno: '/listaagendamentos',
        }
      });
    } 
  }, []);

  const handleChange = (event: any) => {
    setState({ ...status, [event.target.name]: event.target.checked });
  };

  async function buscarListaAgendamentos(e: FormEvent) {
    e.preventDefault();

    let statusIn = ''; 
    if(status.Aguardando){
      statusIn = '0';
    }
    if(status.Confirmado){
      if(statusIn !== ''){
        statusIn = statusIn + ',';
      }
      statusIn = statusIn + '1';  
    }
    if(status.Realizado){
      if(statusIn !== ''){
        statusIn = statusIn + ',';
      }
      statusIn = statusIn + '2';  
    }
    if(statusIn === ''){
      alert('Informe pelo menos um `"Status"` para filtrar seus agendamentos!');
      return;
    } else  {
      statusIn = '(' + statusIn + ')';
    }    

    const response = await api.get('agendamentos', {
      params: {
        getNumerado,
        usuario_agend,
        dataInicio,
        dataFim,
        statusIn 
      }
    });

    setAgendamentos(response.data); // obtendo a lista de agendamentos retornada 

    // Redirecionar para outro formulário para apresentar os dados
    history.push({
      pathname: '/listaagendamentosdados/',
      state: response.data
    });
  }

  const location = useLocation();
  const history = useHistory();
  function goBack(){
      history.goBack();
  }

  return (
    <div>
      <form id="buscar-lista-agendamentos" onSubmit={ buscarListaAgendamentos }>

        <Cabecalho />
        <Voltar titulo="Lista de Agendamentos" />;

        <div id="page-lista-agendamentos" className="container-lista-agendamentos">
          <div className="input-block">
            <TextField
              id="data_inicio"
              name="data_inicio"
              label="Data Inicial"
              type="date"
              defaultValue="checked"
              value={dataInicio} 
              InputLabelProps={{
                shrink: true,
              }}
              onChange={ (e) => {setDataInicio(e.target.value)}}
            /> 
          </div>

          <div className="input-block">
            <TextField
              id="data_final"
              name="data_final"
              label="Data Final"
              type="date"
              defaultValue=""
              value={dataFim} 
              InputLabelProps={{
                shrink: true,
              }}
              onChange={ (e) => {setDataFim(e.target.value)} }
            /> 
          </div>

          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend" >
                Status Desejado
              </FormLabel>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  id="status_Aguardando"
                  name="status_Aguardando"
                  control={<Checkbox 
                              checked={status.Aguardando} 
                              color="primary" 
                              onChange={handleChange} 
                              name="Aguardando"
                          />}
                  label="Aguardando"
                  labelPlacement="end" 
                />

                <FormControlLabel
                  id="status_Confirmado"
                  name="status_Confirmado"
                  control={<Checkbox 
                              checked={status.Confirmado} 
                              color="primary" 
                              onChange={handleChange} 
                              name="Confirmado"
                          />}
                  label="Confirmado"
                  labelPlacement="end" 
                />

                <FormControlLabel
                  id="status_Realizado"
                  name="status_Realizado"
                  control={<Checkbox 
                              checked={status.Realizado} 
                              color="primary" 
                              onChange={handleChange} 
                              name="Realizado"
                              defaultValue="false"
                          />}
                  label="Realizado"
                  labelPlacement="end" 
                />
              </FormGroup>
            </FormControl>
          </div>

          <div >
            <button id="button-buscar-agendamento" type="submit">
              BUSCAR
            </button>
          </div>
          {/* // fim */}
        </div>
      </form>
    </div>

  );
}

export default ListaAgendamentos;


// switch (agendamento.status_agend) {
//   case 0:
//     descricao_status = 'Aguarde';
//       break;
//   case 1:
//     descricao_status = 'Confirmado';
//     break;
//   case 2:
//     descricao_status = 'Recusado';
//     break;
//   case 3:
//     descricao_status = 'Cancelado';
//     break;
//   case 4:
//     descricao_status = 'Em Andamento';
//     break;
//   case 5:
//     descricao_status = 'Realizado';
//     break;
//   case 6:
//     descricao_status = 'Novo Agendamento';
//     break;
// } 