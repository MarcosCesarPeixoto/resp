import { Request, Response } from 'express';
import knex from 'knex';
import db from '../database/connections';

interface tagsOrganizacao {
  tag: string;  
}

var acumulador;

const extrair = (origem) => {
  // Se for um array realiza a extração de seus itens
  if (Array.isArray(origem)) {
    return origem.reduce((acumulador, item) => [...acumulador, ...extrair(item)], []);
  }

  // Se for um objeto, verifica se algum dos valores é um array para realizar a extração
  return Object.values(origem).reduce((acumulador, item) => (
    [...acumulador, ...(Array.isArray(item) ? extrair(item) : [item])]
  ), []);
};


export default class OrganizacoesController{
  async create(req: Request, res: Response) {
    // const data = req.body;
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
  
      // logomarca_org,    
      // dh_criacao_org,
      // dh_atualizacao_org

      tags
    } = req.body;
  
    //console.log(tags);
  
    const trx = await db.transaction();
    
    try {
      const InsertedOrganizacaoId = await trx('organizacao').insert({
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

      const organizacao_Id = InsertedOrganizacaoId[0]; // Pegando o id do registro da organização incluida

      //let query = 

      var query = trx.select(["id"]).table("tag");
      console.log(query.toQuery());

      // trx.select(["id"]).table("tag").then(data => {
      //   // console.log(data);
      //   console.log('executou o select');
      // }).catch (err => {
      //   console.log('deu erro');
      // }) ; 
      //console.log(query.toQuery);

      // daqui para baixo é testes..............................
      // tags.forEach(function (tag) {
      //   console.log(item, index);
      // });

      // console.log(tags[0]);
      // console.log(tags[1]);
      // console.log(organizacao_Id);

      // const classTag = tags.map((tagsOrganizacao: tagsOrganizacao) => {
      //   return {
      //      id,
      //      tag: tagsOrganizacao.tag
      //   };
      // });

      // const nomes = ['Whinds', 'Freeway', 'Teste', 'Maria'];

      // const retornoForEach = nomes.forEach((nomeAtual) => {
      //     console.log(nomeAtual);
      
      //     return nomeAtual.toUpperCase();
      // })
      // console.log(retornoForEach) // undefined

      var arrayDeTags = []
      if (Array.isArray(tags)) {
        arrayDeTags = tags.reduce((acumulador, item) => [...acumulador, ...extrair(item)], []);
      }
      //console.log(arrayDeTags);  

      // const retorno = arrayDeTags.forEach(tagAtual => {
      //   // tagAtual = tagAtual.toUpperCase();
      //   // tagAtual = tagAtual.normalize(); // não está funcionando o normalize() ?????????
      //   console.log(tagAtual);

      //   // const result = trx.select().where({tag: tagAtual}).table("tag").then(data => {
      //     const result = trx.select(["id"]).where({tag: tagAtual}).table("tag").then(data => {
      //       console.log(data);
      //     }).catch(err => {
      //       console.log(err);
      //     });
      // });

      // console.log(result.toQuery());

      // Inserindo uma tag
      // const InsertedTagId = await trx('tag').insert(tags.tag});
      // const InsertedTagsId = await trx('tag').insert(tags);

      // console.log(InsertedTagsId);
      // const tag_Id = InsertedTagId[0]; // Pegando o id do registro da tag incluido

      // inserindo tabela de tags da organização
      // await trx('organizacao_tag').insert({
      //   organizacao_Id,
      //   tag_Id
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
};
