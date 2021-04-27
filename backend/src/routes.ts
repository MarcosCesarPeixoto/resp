import express, { response } from 'express';
import db from './database/connections';

const routes = express.Router();


routes.get('/', (req, res) => {
  return res.json({message: 'Rota Principal'});  
});

routes.post('/organizacoes', async (req, res) => {
  // const data = req.body;
  const {    
    razaosocial_org,
    atividade_org,
    endereco_org,   
    complemento_org,
    numero_org,
    bairro_org,
    cep_org,
    cidade_org,
    descricao_cidade_org,
    uf_org,
    fisico_juridico_org,
    cpf_cnpj_org,
    telefone_org,
    celular_org

    // logomarca_org,    
    // dh_criacao_org,
    // dh_atualizacao_org
  } = req.body;

  // console.log(data);

  const trx = await db.transaction();
  
  try {
    await trx('organizacao').insert({
      razaosocial_org,
      atividade_org,
      endereco_org,   
      complemento_org,
      numero_org,
      bairro_org,
      cep_org,
      cidade_org,
      descricao_cidade_org,
      uf_org,
      fisico_juridico_org,
      cpf_cnpj_org,
      telefone_org,
      celular_org
    });

    await trx.commit();
    
    return res.status(201).send();

  } catch (err) {
    // console.log(err);
    await trx.rollback();
    
    return res.status(400).json({      
      error: 'Erro inesperado ao inserir nova organização: ' + err
    });
 
  }  

  return res.send();
});

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