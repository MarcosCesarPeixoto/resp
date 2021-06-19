import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';

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
  
  let ExibirLogoOrganizacao = (organizacao.logomarca_org);

  const history = useHistory();
  
  const redirectListaAtendimentos = () => { 
    history.push({
      pathname: '/listaatendimentos',
      search: '?id_org=' + organizacao.id_org,
      state: { id_org: organizacao.id_org,
               razaosocial_org: organizacao.razaosocial_org,
               endereco_org: organizacao.endereco_org,
               complemento_org: organizacao.complemento_org,
               numero_org: organizacao.numero_org,
               bairro_org: organizacao.bairro_org,
               cep_org: organizacao.cep_org,
               cidade_org: organizacao.cidade_org,
               descricao_cidade_org: organizacao.descricao_cidade_org,
               uf_org: organizacao.uf_org,
               telefone_org: organizacao.telefone_org,
               celular_org: organizacao.celular_org,
               logomarca_org: organizacao.logomarca_org 
             }
    });
  }

  return (
    <div className="organizacao-item" onClick={redirectListaAtendimentos}>
      <header>      
        {ExibirLogoOrganizacao && <img src={organizacao.logomarca_org} alt={organizacao.razaosocial_org}/>}
        <div>
          <strong>{organizacao.razaosocial_org}</strong>
          <span>
            {organizacao.endereco_org}, {organizacao.numero_org} {organizacao.complemento_org} - {organizacao.bairro_org} <br></br>
            {organizacao.descricao_cidade_org}-{organizacao.uf_org} {organizacao.cep_org} <br></br>
            {organizacao.telefone_org} - {organizacao.celular_org}
          </span>
        </div>
      </header>
    </div>
  );
}

export default OrganizacaoItem;