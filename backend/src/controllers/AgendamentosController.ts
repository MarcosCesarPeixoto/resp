import { NextFunction, raw, Request, response, Response } from 'express';
import knex from 'knex';
import db from '../database/connections';

export default class AgendamentosController {

  // Método POST
  async create(req: Request, res: Response, next: NextFunction) {

    console.log(req);

    // Pegando o conteúdo passado no req
    const {      
      usuario_agend,
      organizacao_agend,
      atendimento_agend,
      colaborador_agend,
      data_agend,
      hora_agend,
      status_agend,
      observacao_agend,
      agend_anterior_agend,
      //dh_criacao_agend,
      //dh_atualizacao_atd
    } = req.body;

    // criando a transação
    const trx = await db.transaction();

    try {
      await trx('agendamento').insert({
        usuario_agend,
        organizacao_agend,
        atendimento_agend,
        colaborador_agend,
        data_agend,
        hora_agend,
        status_agend,
        observacao_agend,
        agend_anterior_agend
        });

      // efetuando o commit no banco de dados e enviando o status como resposta
      await trx.commit();
      return res.status(201).send();

    } catch(err) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro inexperado ao inserir novo Agendamento: ' + err
      });
    };    
  }

  // // Método GET
  // async index(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const filtros = req.query;

  //     const id_agend          = filtros.id_agend as string;
  //     const usuario_agend     = filtros.usuario_agend as string;
  //     const data_agend        = filtros.data_agend as string;
  //     const organizacao_agend = filtros.organizacao_agend as string;
 
  //     // if (id_agend){
  //       const agendamentos = await db("agendamento")
  //       .whereRaw('`agendamento`.`organizacao_agend` = ??', Number(organizacao_agend));
  //       // .whereRaw('`agendamento`.`organizacao_agend` = ??', [Number(organizacao_agend)])
               
  //     // }
  //     // const agendamentos = await db("agendamento")
  //     //   .whereRaw('`agendamento`.`organizacao_agend` = ??', [Number(organizacao_agend)])
  //     //   // .whereRaw('`agendamento`.`data_agend` = ??',  [Date(data_agend)]);
  //     //   .whereRaw('`agendamento`.`data_agend` = ??',  [data_agend]);

  //     return response.json(agendamentos);

  //   } catch(error) {
  //     next(error);
  //   }
  // }

  // Método GET
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_agend } = req.query;
      const { usuario_agend } = req.query; 
      const { data_agend } = req.query; 
      const { organizacao_agend } = req.query; 

      console.log(organizacao_agend);

      const query = db('agendamento');

      // "2021-07-11"
      console.log(data_agend);
      let filtrodata = "(data_agend=" + `"` + data_agend + `"`+ ")";
      console.log(filtrodata);

      if (id_agend) {
        query.where({ id_agend });
      } else if (usuario_agend) {
        query.where({ usuario_agend });
      } else if (data_agend) {
        if (data_agend && organizacao_agend) {
          console.log(organizacao_agend + " - " + data_agend);
          query.whereRaw("(organizacao_agend=" + organizacao_agend + ")");
          query.whereRaw(filtrodata);
        } else if (data_agend) {
          query.where({ data_agend });
        }
      }

      const results = await query;

      console.log(results);
      return res.json(results);

      

    } catch(error) {
      next(error);
    }
  }

  // // Método GET
  // async indexnadata(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { usuario_agend } = req.query;      
  //     const { data_agend } = req.query;      
  //     const { organizacao_agend } = req.query;   

  //     console.log(organizacao_agend);

  //     const query = db.select('hora_agend').from('agendamento');
  //     if (data_agend && organizacao_agend) {
  //       console.log(organizacao_agend + " - " + data_agend);
  //       query.whereRaw("(organizacao_agend=" + organizacao_agend + ")");
  //       query.whereRaw("(data_agend=" + data_agend + ")");
  //     }

  //     const results = await query;
  //     return res.json(results);

  //   } catch(error) {
  //     next(error);
  //   }
  // }


  // // Método GET
  // async index2(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id_atd } = req.query;
  //     const { organizacao_atd } = req.query;

  //     const query = db('atendimento');

  //     if (id_atd) {
  //       query.where({ id_atd });
  //     } else if (organizacao_atd) {
  //       query.where({ organizacao_atd });
  //     }

  //     const results = await query;
  //     return res.json(results);

  //   } catch(error) {
  //     next(error);
  //   }
  // }

  // Método PUT
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_agend } = req.params;

      const {
        usuario_agend,
        organizacao_agend,
        atendimento_agend,
        colaborador_agend,
        data_agend,
        hora_agend,
        status_agend,
        observacao_agend,
        agend_anterior_agend,
      } = req.body;

      await db('agendamento')
      .update({ 
        usuario_agend,
        organizacao_agend,
        atendimento_agend,
        colaborador_agend,
        data_agend,
        hora_agend,
        status_agend,
        observacao_agend,
        agend_anterior_agend,
       })
      .where({ id_agend });

      return res.send();

    } catch(error) {
      next(error);
    }
  }

  // Método DELETE
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_agend } = req.params;

      await db('agendamento')
      .delete()
      .where( { id_agend });

      return res.send();

    } catch (error) {
      next(error);
    }
  }

}