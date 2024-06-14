import estilos from './Inicial.module.css';
import { Cabecalho } from '../Componentes/Cabecalho';
import { ConteudoInicio } from '../Componentes/ConteudoInicio';
import { Outlet } from 'react-router-dom';


export function Inicial() {

  return (
    <div className={estilos.gridConteiner}>
      <Cabecalho/>
      <ConteudoInicio></ConteudoInicio>
      <Outlet/>
    </div>
  )
}


