import { NextFunction, raw, Request, Response } from 'express';
import knex from 'knex';
import db from '../database/connections';

export default class AtendimentosController {

  // Método POST
  async create(req: Request, res: Response, next: NextFunction) {

    // Pegando o conteúdo passado no req
    const {
      tipo_atd,
      descricao_atd,
      usuario_escolhe_atd,
      cobrado_atd,
      valor_atd,
      comissão_atd,
      tempo_estimado_atd,
      horario_padrao_inicio_atd,
      horario_padrao_fim_atd,
      organizacao_atd,
      ativo_atd,
      imagem_atd,
      dh_criacao_atd,
      dh_atualizacao_atd
    } = req.body;

    // criando a transação
    const trx = await db.transaction();

    try {
      
      await trx('atendimento').insert({
        tipo_atd,
        descricao_atd,
        usuario_escolhe_atd,
        cobrado_atd,
        valor_atd,
        comissão_atd,
        tempo_estimado_atd,
        horario_padrao_inicio_atd,
        horario_padrao_fim_atd,
        organizacao_atd  
      });

      // efetuando o commit no banco de dados e enviando o status como resposta
      await trx.commit();
      return res.status(201).send();

    } catch(err) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro inexperado ao inserir novo Atendimentos: ' + err
      });
    };    
  }

  // Método GET
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      // const { id_atd } = req.query;
      var id_atd = req.query.id_atd;
      var organizacao_atd = req.query.organizacao_atd;
      
      const query = db('atendimento');
      if (id_atd) {
        query.where({ id_atd });
      } else if (organizacao_atd) {
        query.where({ organizacao_atd });
      }

      const results = await query;
      return res.json(results);

    } catch(error) {
      next(error);
    }
  }

  // Método PUT
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_atd } = req.params;

      const {
        tipo_atd,
        descricao_atd,
        usuario_escolhe_atd,
        cobrado_atd,
        valor_atd,
        comissão_atd,
        tempo_estimado_atd,
        horario_padrao_inicio_atd,
        horario_padrao_fim_atd,
        organizacao_atd 
      } = req.body;

      await db('atendimento')
      .update({ 
        tipo_atd,
        descricao_atd,
        usuario_escolhe_atd,
        cobrado_atd,
        valor_atd,
        comissão_atd,
        tempo_estimado_atd,
        horario_padrao_inicio_atd,
        horario_padrao_fim_atd,
        organizacao_atd 
       })
      .where({ id_atd });

      return res.send();

    } catch(error) {
      next(error);
    }
  }

  // Método DELETE
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_atd } = req.params;

      await db('atendimento')
      .delete()
      .where( { id_atd });

      return res.send();

    } catch (error) {
      next(error);
    }
  }

}