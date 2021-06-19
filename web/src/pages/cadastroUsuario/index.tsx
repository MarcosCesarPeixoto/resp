
import { Button, createMuiTheme, TextField, ThemeProvider } from '@material-ui/core';
import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Cabecalho from '../../componentes/Cabecalho';

import api from '../../services/api';

import '../../assets/styles/global.css';
import './styles.css';

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

function CadastroUsuario () {
  const history = useHistory();

  const [nome_usu, setNomeUsuario] = useState('');
  const [email_usu, setEmailUsuario] = useState('');
  const [senha_usu, setSenhaUsuario] = useState('');

  function handleIncluirUsuario(e: FormEvent ) {
    e.preventDefault(); 

    api.post('usuarios', {
      nome_usu,
      email_usu,
      senha_usu
    }).then(() => {
      alert('Cadastro de Usuário realizado com sucesso!');
      history.push('/listaorganizacoes');
    }).catch((error) => { 
      if (error.response){
        alert('Erro no cadastro de usuário: ResponseError = ' + error.response);
      } else if(error.request){
        alert('Erro no cadastro de usuário: RequestError = ' + error.response.request._response);
      }else if(error.message){
        alert('Erro no cadastro de usuário: MessageError = ' + error.message);
      }
    });
  }

  return (
    <div id="cadastro-usuario" className="container-cadastrousuario">
    
      <Cabecalho />

      <main className="container-cadastrousuario">
        <form onSubmit={handleIncluirUsuario}>
          <fieldset className="container-form">
            {/* <legend className="titulo" >Cadastro de Usuário</legend> */}
            <h2 className="titulo">Cadastro de Usuário</h2>
            
            <div className="input-block" >
              <TextField 
                id="nome_usu" 
                label="Nome Completo *" 
                type="text" 
                fullWidth 
                value={nome_usu} 
                onChange={(e) => { setNomeUsuario(e.target.value) }}
              /> 
            </div>

            <div className="input-block">
              <TextField 
                id="email_usu" 
                label="E-mail *" 
                type="text" 
                fullWidth
                value={email_usu} 
                onChange={(e) => { setEmailUsuario(e.target.value) }}
              />
            </div>

            <div className="input-block">
              <TextField 
                id="senha_usu" 
                label="Senha *" 
                type="password" 
                fullWidth
                value={senha_usu} 
                onChange={(e) => { setSenhaUsuario(e.target.value) }}
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
  )
};

export default CadastroUsuario;


