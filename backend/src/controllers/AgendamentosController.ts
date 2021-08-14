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
      agend_anterior_agend
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
      // return res.status(201).send();
      return res.status(201).json(res); // Marcos

    } catch(err) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro inexperado ao inserir novo Agendamento: ' + err
      });
    };    
  }

  // Método GET
  async index(req: Request, res: Response, next: NextFunction) {
    try { 
      console.log(req.query);

      // var getNumerado = req.query.getNumerado;
      // var statusIn    = req.query.statusIn;
      // var dataInicio  = req.query.dataInicio;
      // var dataFim     = req.query.dataFim;

      const { getNumerado } = req.query;
      const { statusIn } = req.query;
      const { dataInicio } = req.query;
      const { dataFim } = req.query;

      const { id_agend } = req.query;
      const { usuario_agend } = req.query; 
      const { data_agend } = req.query; 
      const { organizacao_agend } = req.query; 
      const { status_agend } = req.query;

      console.log({
        getNumerado,
        usuario_agend,
        dataInicio,
        dataFim,
        statusIn
      });

      var query = db('agendamento');
      if (getNumerado) {  // getNumerado é quando passa como parâmetro um número de get para ser executado para atender diversos tipos de requerimentos
        if (getNumerado==='1'){  // get por Usuario + Periodo Inicial/Final + Status {        
          console.log('getNumerado'); 
          query.leftJoin('organizacao', 'agendamento.organizacao_agend', 'organizacao.id_org');
          query.whereRaw("(usuario_agend=" + usuario_agend + ")");

          query.whereRaw("(data_agend between '" + dataInicio + "' and '" + dataFim + "')");
          // query.whereBetween('data_agend', [dataInicio, dataFim]); // ==>> essa bosta não funciona

          query.whereRaw("(status_agend in " + statusIn + ")");
          query.orderBy('data_agend', 'hora_agend');

          console.log(query.toQuery() );
        } else {
          return res.json('Erro inexperado - 501');
        }
      } else {  
        console.log('não é getNumerado');
        if (usuario_agend && organizacao_agend && status_agend) {
          query.whereRaw("(organizacao_agend=" + organizacao_agend + ")");
          query.whereRaw("(usuario_agend=" + usuario_agend + ")");
          query.whereRaw("(status_agend=" + status_agend + ")");        
        } else if (usuario_agend) {
          query.where({ usuario_agend });
        } else if (data_agend) {
          if (data_agend && organizacao_agend) {
            console.log('aqui');
            query.whereRaw("(organizacao_agend=" + organizacao_agend + ")");
            query.whereRaw("(data_agend='" + data_agend + "')");
            query.orderBy('organizacao_agend', 'data_agend');
          } else if (data_agend) {
            query.where({ data_agend });
          }
        } else if (id_agend) {
          query.where({ id_agend });
        }
      }   

      console.log(query.toQuery() );

      const results = await query;
      console.log(results);
      return res.json(results);
    
    } catch(error) {
      next(error);
    };
  }

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
