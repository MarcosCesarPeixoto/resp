import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Principal from './pages/principal';
import Organizacao from './pages/organizacao'
import CadastroUsuario from './pages/cadastroUsuario'
import CadastroAgendamento from './pages/cadastroAgendamento';

import ListaOrganizacoes from './pages/listaorganizacoes/index'
import ListaAtendimentos from './pages/listaatendimentos';

function Routes() {
  return (
    <BrowserRouter>
      
      <Route path="/" exact component={Principal} />
      <Route path="/organizacao" component={Organizacao} />
      <Route path="/cadastrousuario" component={CadastroUsuario} />
      <Route path="/cadastroagendamento" component={CadastroAgendamento} />

      <Route path="/listaorganizacoes" component={ListaOrganizacoes} />
      <Route path="/listaatendimentos" component={ListaAtendimentos} />

    </BrowserRouter>
  );
}

export default Routes;