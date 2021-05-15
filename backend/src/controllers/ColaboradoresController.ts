import { NextFunction, raw, Request, Response } from 'express';
import knex from 'knex';
import db from '../database/connections';

export default class ColaboradoresController{

  // Método POST
  async create(req: Request, res: Response) {
    const {
      nome_colab,
      email_colab,
      celular_colab,
      confirmado_colab,
      organizacao_colab,
      avatar_colab
    } = req.body;

    const trx = await db.transaction();

    try {

      await trx('colaborador').insert({
        nome_colab,
        email_colab,
        celular_colab,
        confirmado_colab,
        organizacao_colab,
        avatar_colab
      });

      await trx.commit();
      return res.status(201).send();

    } catch(err) {

      await trx.rollback();
      return res.status(400).json({
        error: 'Erro inexperado ao inserir novo colaborador: ' + err
      });

    }

    return res.send();

  };


  // Método GET
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_colab } = req.query;   // Extraindo o id_colab passado 
      const { nome_colab } = req.query; // Extraindo o nome_colab passado 
      const { organizacao_colab } = req.query; // Organização à qual o colaborador está relacionado.

      const query = db('colaborador');

      // Tornando o retorno dinâmico: Retorna de acordo com o passado, id, nome, organização ou tudo
      if (id_colab) {
        query.where({ id_colab });
      } else if (nome_colab) {
        query.whereRaw("(nome_colab like '%" + nome_colab + "%')")
      } else if (organizacao_colab) {
        query.where({ organizacao_colab });
      }

      const results = await query;
      return res.json(results);
     
    } catch(error) {
      next(error);
    }  
  };

  // Método PUT  
  async update(req: Request, res: Response, next: NextFunction ) {

    try {
      const { id_colab } = req.params;

      const {
        nome_colab,
        email_colab,
        celular_colab,
        confirmado_colab,
        organizacao_colab,
        avatar_colab
      } = req.body;    

      await db('colaborador')
      .update({ 
        nome_colab,
        email_colab,
        celular_colab,
        confirmado_colab,
        organizacao_colab,
        avatar_colab        
       })
      .where({ id_colab });

      return res.send();

    } catch (error) {
      next(error);
    }    
  }

  // Método DELETE
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_colab } = req.params;

      await db('colaborador')
      .delete()
      .where( { id_colab });

      return res.send();

    } catch (error) {
      next(error);
    }
  }

};