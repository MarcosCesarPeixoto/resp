import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';

import '../../assets/styles/global.css';
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

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#757ce8',
//       main: '#228B22',
//       dark: '#006400',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#ff7961',
//       main: '#f44336',
//       dark: '#ba000d',
//       contrastText: '#000',
//     },
//   },
// });

function selecaoHorario() {
  console.log('clicou no selecaoHorario');
}

function Horarios() {
  return(
    <div className="horario-container">
      <div className="horario-item" style={{ color:"#FFFFFF" }}>
        08:00
      </div>
      <div className="horario-item" style={{ color:"#FFFFFF" }}>
        08:30
      </div>
      <div className="horario-item" style={{ color:"#FFFFFF" }} onClick={selecaoHorario}>
        09:00
      </div>
      <div style={{ color:"#FFFFFF", background:"#C7B7B7", cursor:"none", textDecoration:"line-through" }} className="horario-item" onClick={selecaoHorario} >
        10:00
      </div>
      <div className="horario-item" style={{ color:"#FFFFFF" }} onClick={selecaoHorario}>
        10:30
      </div>

    </div>
  );
}

export default Horarios;