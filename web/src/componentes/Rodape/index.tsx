import React from 'react';
import './styles.css';

import logoImg from '../../assets/images/mao.png';

function Rodape () {
  return (
    <div id="rodape" className="footer">
      <img src={logoImg} alt="logo"/>
      <div>Copyrigth 2021</div>
    </div>
  );
}

export default Rodape;