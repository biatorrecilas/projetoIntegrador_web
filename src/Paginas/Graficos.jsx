import React from 'react';
import { Cabecalho } from "../Componentes/Cabecalho";
import { GraficoUmidade } from '../Componentes/GraficoUmidade';
import { GraficoLuminosidade } from '../Componentes/GraficoLuminosidade';
import { GraficoContador } from '../Componentes/GraficoContador';
import { GraficoTemperatura } from '../Componentes/GraficoTemperatura';

export function Graficos() {
    return (
        <div style={{backgroundColor: 'black'}}>
            <Cabecalho />
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px'}}>
                <div>
                    <GraficoTemperatura />
                </div>
                <div>
                    <GraficoUmidade />
                </div>
                <div>
                    <GraficoLuminosidade />
                </div>
                <div>
                    <GraficoContador />
                </div>
            </div>
        </div>
    );
}
