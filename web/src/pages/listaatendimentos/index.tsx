import React from 'react'
import Principal from '../principal';
import Destaque from '../../componentes/Destaque';
import OrganizacaoItem from '../../componentes/OrganizacaoItem';

import '../../assets/styles/global.css'

const organizacao = {
  
    "id_org": 1,
    "razaosocial_org": "Bela Fashion",
    "atividade_org": 1,
    "endereco_org": "Rua São José",
    "complemento_org": "Loja 1",
    "numero_org": "100",
    "bairro_org": "Centro",
    "cep_org": "36502-000",
    "cidade_org": 1,
    "descricao_cidade_org": "Ubá",
    "uf_org": "MG",
    "fisico_juridico_org": 0,
    "cpf_cnpj_org": "25722123000100",
    "telefone_org": "(32) 1234-5378",
    "celular_org": "(32) 1234-5378",
    "logomarca_org": "../../assets/images/lixo/logo2.jpg",
    "dh_criacao_org": null,
    "dh_atualizacao_org": null
  
}

function ListaAtendimentos() {

  // console.log(response.data);

  const titulo = "Selecione o atendimento desejado";

  return (
    <div>
      <Principal />      
      <OrganizacaoItem key={1} organizacao={organizacao} />;
      <Destaque titulo={titulo} />
      
      <h1>Lista de Atendimentos da Organização</h1>
    </div>
  )
}

export default ListaAtendimentos;