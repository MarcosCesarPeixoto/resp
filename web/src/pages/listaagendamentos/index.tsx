import React, { FormEvent, useState } from "react";

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Cabecalho from "../../componentes/Cabecalho";
// import CheckStatus from "../../componentes/CheckStatus";

import './styles.css';

import { Button, createMuiTheme, createStyles, makeStyles, TextField, Theme, ThemeProvider } from "@material-ui/core";
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


function ListaAgendamentos() {
  const [getNumerado] = useState(1); 

  const [usuario_agend, setUsuarioAgend] = useState(1);

  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const [statusAguardando, setStatusAguardando] = useState('checked');
  const [statusConfirmado, setStatusConfirmado] = useState('checked');
  const [statusRealizado, setStatusRealizado] = useState('unchecked');

  // const classes = useStyles();

  async function buscarListaAgendamentos(e: FormEvent) {
    e.preventDefault();

    let statusIn = ''; 
    if(statusAguardando==='checked'){
      statusIn = '0';
    }
    if(statusConfirmado==='checked'){
      if(statusIn !== ''){
        statusIn = statusIn + ',';
      }
      statusIn = statusIn + '1';  
    }
    if(statusRealizado==='checked'){
      if(statusIn !== ''){
        statusIn = statusIn + ',';
      }
      statusIn = statusIn + '2';  
    }
    if(statusIn === ''){
      alert('Pelo menos um `"Status Desejado"` deve ser informado!');
      return;
    } else  {
      statusIn = '(' + statusIn + ')';
    }

    console.log(statusIn)

    // const statusIn = '(0,1)';
    // const dataIn = 'between ('`2021-07-10`' and `2021-07-10`)';

    const response = await api.get('listaagendamentos', {
      params: {
        getNumerado,
        usuario_agend,
        dataInicio,
        dataFim,
        statusIn 
      }
    })

    console.log(response.data);
    
  }

  // function handleChangeStatusAguardando(e: React.ChangeEvent<HTMLInputElement>) {
  //   let data = e.target.value;
  //   setStatusAguardando(data);
  // } 

  return (
    <div>
      <form id="buscar-lista-agendamentos" onSubmit={ buscarListaAgendamentos }>

        <Cabecalho />
        <Titulo titulo="Lista de Agendamentos" />;

        <div id="page-lista-agendamentos" className="container-lista-agendamentos">
          {/* <div className="container-pesquisa-dataagendamentos"> */}

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
              {/* <CheckStatus />   */}

              <FormControl component="fieldset">
                <FormLabel component="legend" >Status Desejado</FormLabel>
                <FormGroup aria-label="position" row>

                  <FormControlLabel
                    name="status_Aguardando"
                    control={<Checkbox color="primary" />}
                    label="Aguardando"
                    labelPlacement="end"                   
                    value={statusAguardando} 
                    // onChange={ (e) => {setDataFim(e.target.value)} }
                  />

                  <FormControlLabel
                    value="1"
                    control={<Checkbox color="primary" />}
                    label="Confirmado"
                    labelPlacement="end"
                  />

                  <FormControlLabel
                    value="2"
                    control={<Checkbox color="primary" />}
                    label="Realizado"
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
            </div>
            {/* <div className="input-block"> 
                <br />
                <ThemeProvider theme={theme}>
                  <Button type="submit" variant="contained" color="primary" size={"small"} style={{ borderRadius: 50 }} className="botao" >
                    Filtrar
                  </Button>
                </ThemeProvider>
            </div> */}

            <div>
              <FormLabel component="legend" >Status Desejado</FormLabel>              
              <FormControlLabel
                control={(
                  <Checkbox defaultChecked />
                )}
                label="Aguardando"
                // onChange={ (e) => {setStatusAguardando(e.target.event)}}
                // onChange={ (e) => {setStatusAguardando(event.target.checked)}}
                // onChange={ handleChangeStatusAguardando }
                // onClick={ (e) => {setStatusAguardando(e.target.checked)}}
              />

              <FormControlLabel
                control={<Checkbox />}
                label="Confirmado"
              />
              <FormControlLabel
                control={(
                  <Checkbox defaultChecked />
                )}
                label="Realizado"
              />
            </div>

            {/* <div>
              <span>
                <label style="Teste1">
                  <input
                    type="checkbox"
                    defaultChecked={this.state.complete}
                    ref="complete"
                    onChange={this.handleChange}
                  />
                  {this.props.text}
                </label>
              </span>
            </div>  */}

            <div >
              <button id="button-buscar-agendamento" type="submit">
                BUSCAR
              </button>
            </div>

            {/* <div>
              <Button size="small" className={classes.margin}>
                Small
              </Button>
            </div> */}

          {/* </div> */}

          {/* <div className="container-pesquisa-statusagendamentos">
              <CheckStatus />
          </div> */}

        </div>
      </form>
    </div>

  );
}

export default ListaAgendamentos;
