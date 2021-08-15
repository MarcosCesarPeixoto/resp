import { NextFunction, raw, Request, Response } from 'express';
import knex from 'knex';
import db from '../database/connections';


export default class LoginController{

  // Método GET
  async index(req: Request, res: Response, next: NextFunction) {

    const { email_usu } = req.query;
    const { senha_usu } = req.query;

    console.log(email_usu);
    console.log(senha_usu);

    const result = await db.select('id_usu', 'nome_usu', 'email_usu', 'senha_usu').from('usuario')
      .where({ email_usu });

    if ((result.length === 0) || (result[0].senha_usu !== senha_usu)) {
      return res.status(400).json({
        erro: true,
        mensagem: "Usuário ou senha incorreto!"
      })
    }

    const token = 'abc123';

    return res.json({
      erro: false,
      mensagem: "Usuário válido",
      id_usu: result[0].id_usu,
      nome_usu: result[0].nome_usu,
      email_usu: result[0].email_usu,
      token
    })
  }
 
}