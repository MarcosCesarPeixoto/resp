import { Request, Response } from 'express';

import db from '../database/connections';

export default class OrganizacoesController{
  async create(req: Request, res: Response) {
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
  };
};
