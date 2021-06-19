import React  from 'react';
import { useLocation } from "react-router-dom";

import Cabecalho from '../../componentes/Cabecalho';
import Destaque from '../../componentes/Destaque';
import OrganizacaoDados from '../../componentes/OrganizacaoDados';

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

// const ListaAtendimentos: React.FC = (props) => {
//   const titulo = "Selecione o atendimento desejado"; 
  
//   const  [textRazaoSocial, setTextRazaoSocial] = useState("");

//   useEffect(() => {
//     setTextRazaoSocial(props.location.state.razao_social);
//   }, []);  

//   console.log(textRazaoSocial);
    
//   return (
//     <div>      
//       <Cabecalho />
//       {/* <OrganizacaoDados organizacao={ state } />  */}
//       <Destaque titulo={titulo} /> 
//     </div>
//   );
// }
// **************************************************

const ListaAtendimentos: React.FC = () => {
  const titulo = "Selecione o atendimento desejado"; 
  const { state }  = useLocation<Organizacao>();

  return (
    <div>      
      <Cabecalho />
      <OrganizacaoDados organizacao={ state } /> 
      <Destaque titulo={titulo} /> 
    </div>
  );
}

export default ListaAtendimentos;