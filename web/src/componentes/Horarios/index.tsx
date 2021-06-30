import React from 'react';
import './styles.css';

const horarios = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00'
]

function Horarios() {
  return(
    <div className="horario-container">
      <div className="horario-item">
        08:00
      </div>
      <div className="horario-item">
        08:30
      </div>
      <div className="horario-item">
        09:00
      </div>
    </div>
  );
}

export default Horarios;