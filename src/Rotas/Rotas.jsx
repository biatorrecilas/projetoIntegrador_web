import { Route, Routes } from "react-router-dom";
import { Inicial } from '../Paginas/Inicial';
import { Login } from "../Paginas/Login";
import { Cadastro } from "../Paginas/Cadastro";
import { Mapa } from "../Paginas/Mapa";
import { Sensor } from "../Paginas/Sensores";
import { CadastroSensor } from "../Paginas/CadSensor";
import { AlteraSensor } from "../Paginas/AlteraSensor";
import { Graficos } from "../Paginas/Graficos";


export function Rotas(){
    return(
        <Routes>
            <Route path="/" element={ <Login/>}></Route>
            <Route path="cadastro" element={ <Cadastro/>}></Route>

            <Route path="inicial" element={ <Inicial/>}></Route>
            <Route path="mapa" element={<Mapa/>}></Route>
            <Route path="sensores" element={<Sensor/>}></Route>
            <Route path="cadastrosensor" element={<CadastroSensor/>}></Route>
            <Route path="alterarsensor/:id" element={<AlteraSensor />} />
            <Route path="graficos" element={<Graficos />}></Route>

        </Routes>
    )
}