import React from 'react';

import './styles.css';

import logoOrg5 from '../../assets/images/lixo/logo2.jpg';

function OrganizacaoItem() {
  return (
    <article className="organizacao-item">
      <header>
        <img src={logoOrg5} alt="logo"/>
        <div>
          <strong>Mara Studio</strong>
          <span>Endereço da organização ou empresa</span>
        </div>
      </header>
    </article>
  );
}

export default OrganizacaoItem;