import estilos from './Mapa.module.css';
import { Cabecalho } from '../Componentes/Cabecalho';
import { ConteudoMapa } from '../Componentes/ConteudoMapa';
import { Outlet } from 'react-router-dom';

export function Mapa() {

  return (
    <div className={estilos.gridConteiner}>
      <Cabecalho/>
      <ConteudoMapa></ConteudoMapa>
      <Outlet/>
    </div>
  )
}