import { NextFunction, raw, Request, Response } from 'express';
import knex from 'knex';
import db from '../database/connections';

export default class LoginController{

  // Método GET
  async index(req: Request, res: Response, next: NextFunction) {

    const { email_usu } = req.query;
    const { senha_usu } = req.query;

    const usuario = await db.select('nome_usu', 'email_usu', 'senha_usu').from('usuario')
    .where({ email_usu });
    
    if(usuario === null) {
      return res.status(400).json({
        erro: true,
        mensagem: "Usuário ou senha não encontrado!"
      })
    }

    return res.json({
      erro: false,
      mensagem: "Usuário válido"
    })

  }
 
}