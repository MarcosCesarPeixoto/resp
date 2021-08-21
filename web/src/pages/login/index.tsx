import { TextField, ThemeProvider, Button, createMuiTheme } from '@material-ui/core';
import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Cabecalho from '../../componentes/Cabecalho';
import Titulo from '../../componentes/Titulo';
import api from "../../services/api";

import './styles.css';

require('dotenv').config();

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

function Login () {

  const [email_usu, setEmailUsuario] = useState('');
  const [senha_usu, setSenhaUsuario] = useState('');

  // const [status, setStatus = useState({
  //   type: '',
  //   mensagem: ''
  // })];

  async function handleLogin(e: FormEvent ) {
    e.preventDefault(); 

    if (!email_usu){
      alert('E-mail de acesso não foi informado!');
      return;
    }
    
    if (!senha_usu){
      alert('Senha de acesso não foi informada!');
      return;
    }

    try{
      const response = await api.get('login', {
        params: {
          email_usu,
          senha_usu
        }
      });

      console.log(response.data.nome_usu);
      localStorage.setItem('ID_USUARIO', response.data.id_usuario);
      localStorage.setItem('NOME_USUARIO', response.data.nome_usuario);
    }catch{
      alert('Usuário ou senha inválido!'); 
    }  

    // await api.get('login', {
    //   params: {
    //     email_usu,
    //     senha_usu
    // }}).catch((err) => {
    //   if(err.response){
    //     setStatus({
    //       type: 'error',
    //       mensagem: err.response.data.mensagem
    //     });
    //   }else{
    //     setStatus({
    //       type:'error',
    //       mensagem: 'Erro: Tente mais tarde!'
    //     });
    //   }
    // })

  }

  return (
    <div id="login" className="container-login">

      <Cabecalho />  
      <Titulo titulo="Faça seu login" />; 

      <form onSubmit={handleLogin}>
        <div className="input-block">
          <TextField 
            id="email_usu" 
            label="E-mail" 
            type="text" 
            fullWidth
            value={email_usu} 
            onChange={(e) => { setEmailUsuario(e.target.value) }}
          />
        </div>

        <div className="input-block">
          <TextField 
            id="senha_usu" 
            label="Senha" 
            type="password" 
            fullWidth
            value={senha_usu} 
            onChange={(e) => { setSenhaUsuario(e.target.value) }}
          />
        </div>  

        <div className="input-block">
          <br></br>
          
          <div className="helplogin-container">
            <Link to="/">Esqueci minha senha</Link>
          </div>

          <ThemeProvider theme={theme}>
            <Button type="submit" variant="contained" color="primary" style={{ borderRadius: 50 }} className="botao" >
              Login
            </Button>
          </ThemeProvider>

          <div className="helplogin-container">
            Não tem uma conta?
            <br></br>
            <Link to="/cadastrousuario">Cadastre-se</Link>
          </div>  
        </div>
      </form>
    </div> 
  )

};

export default Login;
