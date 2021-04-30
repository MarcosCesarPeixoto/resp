import { NextFunction, Request, Response } from 'express';
import knex from 'knex';
import db from '../database/connections';

export default class OrganizacoesController{
  
  // Método GET
  async index(req: Request, res: Response, next: NextFunction) {
    try{
      const { conteudo_busca } = req.query;

      let organizacoes = null;
      if (conteudo_busca) {
        // buscar pelo conteúdo informado
         organizacoes = await db('organizacao')
          // .whereRaw("(razaosocial_org like '%" + conteudo_busca + "%') or (id > 40)");      
          .whereRaw("(razaosocial_org like '%" + conteudo_busca + "%')");      
      } else {
        // busca tudo
         organizacoes = await db('organizacao');
      }

      return res.json(organizacoes);  
    } catch (error) {
      next(error);
    }
  }

  // Método POST
  async create(req: Request, res: Response) {
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
      celular_org,
      tags
    } = req.body;
  
    const trx = await db.transaction();
    
    try {
      const OrganizacaoInserida = await trx('organizacao').insert({
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
      // Pegando o id da organização incluida para a inserção em organizacao_tag
      const organizacao_Id = OrganizacaoInserida[0]; 

      //----------------------------------- x ---------------------------------
      // ===>>> Aqui é a grande dúvida, como pegar o subconjunto de dados contidos em "tags" e inserir na tabela "organizacao_tag"
      // const OrganizacaoTagInserida = await trx('organizacao_tag').insert({
      //   organizacao_Id,
      //   ????,
      // });
      //----------------------------------- x ---------------------------------
  
      await trx.commit();
      
      return res.status(201).send();
  
    } catch (err) {
      console.log(err);
      await trx.rollback();
      
      return res.status(400).json({      
        error: 'Erro inesperado ao inserir nova organização: ' + err
      });
   
    }  
  
    return res.send();
  };

  // Método PUT
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { razaosocial_org } = req.body;
      const { id } = req.params;

      await db('organizacao')
      .update({ razaosocial_org })
      .where({ id })
      
      return res.send();

    } catch (error) {
      next(error);
    }
    
  }

  // Método DELETE
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      await db('organizacao')
      .where({ id })
      .del();
      
      return res.send()
    } catch (error) {
      next(error);
    }    
  }
 
};
