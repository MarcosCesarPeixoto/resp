import express, { response } from 'express';
import OrganizacoesController from './controllers/OrganizacoesController';

const routes = express.Router();
const organizacoesController = new OrganizacoesController();

routes.get('/', (req, res) => {
  return res.json({message: 'Rota Principal'});  
});

routes.post('/organizacoes', organizacoesController.create);

// routes.get('/organizacoes', (req, res) => {

//   const organizacoes = [
//     { 
//       id_org: 1,
//       razaosocial_org: 'Mara Cabeleireira',
//       atividade_org: 1,
//       endereco_org: 'Vila Wenceslau Roberto Soares',
//       complemento_org: '',
//       numero_org: '58',
//       bairro_org: 'Centro',
//       cep_org: '36502-182',
//       cidade_org: 1,
//       descricao_cidade: 'Ubá',
//       uf_org: 'MG',
//     },
//     { 
//       id_org: 2,
//       razaosocial_org: 'Stylo Hair',
//       atividade_org: 1,
//       endereco_org: 'Av. Brasil',
//       complemento_org: 'Loja 1',
//       numero_org: '1000',
//       bairro_org: 'Centro',
//       cep_org: '36502-182',
//       cidade_org: 1,
//       descricao_cidade: 'Ubá',
//       uf_org: 'MG',
//     },    
//   ]

//   return res.json(organizacoes);

// });

// app.post('/organizacoes', (req, res) => {

//   console.log(req.body);

//   const organizacoes = [
//     { 
//       id_org: 1,
//       razaosocial_org: 'Mara Cabeleireira',
//       atividade_org: 1,
//       endereco_org: 'Vila Wenceslau Roberto Soares',
//       complemento_org: '',
//       numero_org: '58',
//       bairro_org: 'Centro',
//       cep_org: '36502-182',
//       cidade_org: 1,
//       descricao_cidade: 'Ubá',
//       uf_org: 'MG',
//     },
//     { 
//       id_org: 2,
//       razaosocial_org: 'Stylo Hair',
//       atividade_org: 1,
//       endereco_org: 'Av. Brasil',
//       complemento_org: 'Loja 1',
//       numero_org: '1000',
//       bairro_org: 'Centro',
//       cep_org: '36502-182',
//       cidade_org: 1,
//       descricao_cidade: 'Ubá',
//       uf_org: 'MG',
//     },    
//   ]

//   return res.json(organizacoes);

// });

// app.delete('/organizacoes/:id', (req, res) => {
//   console.log(req.params.id);
// });

export default routes;