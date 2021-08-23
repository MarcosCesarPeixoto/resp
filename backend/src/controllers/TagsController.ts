import { Request, Response } from 'express';

import db from '../database/connections';

export default class TagsController{
  async create(req: Request, res: Response) {
    
    const {
      tag
    } = req.body;
  
    const trx = await db.transaction();
    
    try {
      await trx('tag').insert({
        tag
      });
  
      await trx.commit();
      
      return res.status(201).send();
  
    } catch(err) {
      await trx.rollback();
      
      return res.status(400).json({      
        error: 'Erro inesperado ao inserir nova tag: ' + err
      });   
    }  
  
    return res.send();
  };
};
