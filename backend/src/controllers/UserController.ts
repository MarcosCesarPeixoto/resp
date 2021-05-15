import { NextFunction, raw, Request, Response } from 'express';
import knex from 'knex';
import db from '../database/connections';

export default class UserController{

  // Método POST
  async create(req: Request, res: Response, next: NextFunction) {
    const {      
      email_usu,
      nome_usu,
      senha_usu
    } = req.body;

    const trx = await db.transaction();

    try {

      await trx('usuario').insert({
        email_usu,
        nome_usu,
        senha_usu
      });

      await trx.commit();
      return res.status(201).send();

    } catch(err) {
      
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro inexperado ao inserir novo usuário: ' + err
      });
    }

    return res.send();

  };

  // Método GET
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { email_usu } = req.query;

      const usuario = await db('usuario')
        .where({ email_usu });

        return res.json(usuario);

    } catch(error) {
      next(error);
    }
  }

  // Método PUT
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_usu } = req.params;

      const {        
        nome_usu,
        senha_usu
      } = req.body;
   
      await db('usuario')
        .update({ 
          nome_usu,
          senha_usu
        })
        .where({ id_usu });

      return res.send();


    } catch (error) {
      next(error);
    }
  }

    // Método DELETE
    async delete(req: Request, res: Response, next: NextFunction) {
      try {
        const { id_usu } = req.params;

        console.log(id_usu);
  
        await db('usuario')
        //.delete()  -- passando a fazer um falso delete, atualizando o campo dh_delete_usu com data/hora que usuário solicitou deleção
        .where( { id_usu })
        .update('dh_delete_usu', 123);
  
        return res.send();
  
      } catch (error) {
        next(error);
      }
    }

}