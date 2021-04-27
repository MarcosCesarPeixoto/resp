import knex from 'knex';

// executa na tabela
export async function up(knex: knex) {
  return knex.schema.createTable('organizacoes', table => {
    table.increments('id').primary();
    table.string('razaosocial_org').notNullable();
    table.integer('atividade_org').notNullable();
    table.string('endereco_org').notNullable();

    table.string('complemento_org');
    table.string('numero_org').notNullable();
    table.string('bairro_org').notNullable();

    table.string('cep_org').notNullable();
    table.integer('cidade_org').notNullable();
    table.string('descricao_cidade_org').notNullable();
    table.string('uf_org').notNullable();
    
    table.integer('fisico_juridico_org').notNullable();
    table.string('cpf_cnpj_org').unique().notNullable();
    
    table.string('telefone_org').notNullable();
    table.string('celular_org').notNullable();
    table.blob('logomarca_org').notNullable();

    table.timestamp('dh_criacao_org').defaultTo(knex.fn.now());
    table.timestamp('dh_atualizacao_org').defaultTo(knex.fn.now());
  });
}

// executa caso ocorra algum erro (rollback)
export async function down(knex: knex) {
  return knex.schema.dropTable('organizacoes');
};
