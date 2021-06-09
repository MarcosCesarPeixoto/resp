import React from 'react';

import './styles.css';

import logoOrg5 from '../../assets/images/lixo/logo2.jpg';

export interface Organizacao {
  id_org: number;
  razaosocial_org: string;
  endereco_org: string;
  complemento_org: string;
  numero_org: string;
  bairro_org: string;
  cep_org: string;
  cidade_org: number;
  descricao_cidade_org: string;
  uf_org: string;
  telefone_org: string;
  celular_org: string;
  logomarca_org: string;
}

interface OrganizacaoItemProps {
  organizacao: Organizacao;
}

const OrganizacaoItem: React.FC<OrganizacaoItemProps> = ({ organizacao }) => {
  return (
    <article className="organizacao-item">
      <header>
        <img src={organizacao.logomarca_org} alt={organizacao.razaosocial_org}/>
        <div>
          <strong>{organizacao.razaosocial_org}</strong>
          <span>
            {organizacao.endereco_org} 
            {organizacao.numero_org}
            {organizacao.complemento_org}
            - Bairro {organizacao.bairro_org}
            - {organizacao.descricao_cidade_org}
            / {organizacao.uf_org}
          </span>
        </div>
      </header>
    </article>
  );
}

export default OrganizacaoItem;