import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { Props } from 'react';

import '../../assets/styles/global.css';
import './styles.css';

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

interface HorariosProps {
  hora: string;
  disponivel?: string;
}

const Horarios: React.FC<HorariosProps> = (props) => {

  let horarioRenderizado;
  if (props.disponivel==="S"){
    horarioRenderizado = 
    <div className="horario-item" style={{ color:"#FFFFFF" }}>
      {props.hora}
    </div>;
  } else {
    horarioRenderizado = 
    <div style={{ color:"#FFFFFF", background:"#C7B7B7", cursor:"none", textDecoration:"line-through" }} className="horario-item" onClick={selecaoHorario} >
      {props.hora}
   </div>;
  }

  return(
    <div className="horario-container">
      {horarioRenderizado}

      {/* <div className="horario-item" style={{ color:"#FFFFFF" }}>
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
      </div> */}

    </div>
  );
}

export default Horarios;