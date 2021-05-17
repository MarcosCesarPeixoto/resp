import { NextFunction, raw, Request, Response } from 'express';
import knex from 'knex';
import db from '../database/connections';

export default class FavoritosController{

  async create(req: Request, res: Response) {    
    const {
      usuario_fav,
      organizacao_fav,
      datahora_vinculo_fav,
      datahora_desvinculo_fav
    } = req.body;
  
    const trx = await db.transaction();
    
    try {
      await trx('favorito').insert({
        usuario_fav,
        organizacao_fav  
      });
  
      await trx.commit();
      
      return res.status(201).send();
  
    } catch(err) {
      // console.log(err);
      await trx.rollback();
      
      return res.status(400).json({      
        error: 'Erro inesperado ao inserir novo favorito: ' + err
      });   
    }  
  
    return res.send();
  };

  // Método PUT
  async update(req: Request, res: Response, next: NextFunction) {
    try {

      const { usuario_fav } = req.params;
      const { organizacao_fav } = req.params;

      console.log(usuario_fav);
      console.log(organizacao_fav);
   
      await db('favoritos')
        .update('datahora_desvinculo_fav', 1)
        .whereRaw("usuario_fav = " + usuario_fav + " and organizacao_fav = " + organizacao_fav);

      return res.send();

    } catch (error) {
      next(error);
    }
  }

  // Método DELETE
  async delete(req: Request, res: Response, next: NextFunction) {
    try {

      const { usuario_fav } = req.params;
      const { organizacao_fav } = req.params;

      await db('favorito')
      .del()
      .whereRaw("usuario_fav = " + usuario_fav + " and organizacao_fav = " + organizacao_fav);

      return res.send();

    } catch (error) {
      next(error);
    }
  }

};
