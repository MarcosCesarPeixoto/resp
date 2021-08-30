import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Principal from './pages/principal';
import Organizacao from './pages/organizacao'
import CadastroUsuario from './pages/cadastroUsuario'
import CadastroAgendamento from './pages/cadastroAgendamento';

import ConfirmacaoAgendamento from './pages/confirmacaoAgendamento';

import ListaOrganizacoes from './pages/listaorganizacoes/index'
import ListaAtendimentos from './pages/listaatendimentos';
import ListaAgendamentos from './pages/listaagendamentos';
import ListaAgendamentosDados from './pages/listaagendamentosdados';


import Login from './pages/login';
import Login2 from './pages/login2';

function Routes() {
  return (
    <BrowserRouter>
      
      <Route path="/" exact component={Principal} />
      <Route path="/organizacao" component={Organizacao} />
      <Route path="/cadastrousuario" component={CadastroUsuario} />
      <Route path="/cadastroagendamento" component={CadastroAgendamento} />

      <Route path="/confirmacaoagendamento" component={ConfirmacaoAgendamento} />

      <Route path="/listaorganizacoes" component={ListaOrganizacoes} />
      <Route path="/listaatendimentos" component={ListaAtendimentos} />
      <Route path="/listaagendamentos" component={ListaAgendamentos} />
      <Route path="/listaagendamentosdados" component={ListaAgendamentosDados} />

      <Route path="/login" component={Login} />
      <Route path="/login2" component={Login2} />

    </BrowserRouter>
  );
}

export default Routes;