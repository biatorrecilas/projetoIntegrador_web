import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Localizacao from './Localizacao';
import estilos from './ConteudoMapa.module.css';

export function ConteudoMapa() {
    const [pontos, setPontos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSensores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('https://anabeatriztorrecilas.pythonanywhere.com/api/sensores/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const sensores = response.data;
                const pontos = sensores.map(sensor => ({
                    latitude: sensor.latitude,
                    longitude: sensor.longitude,
                    tipo: sensor.tipo,
                    localizacao: sensor.localizacao,
                }));
                setPontos(pontos);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }
        fetchSensores();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro ao carregar os dados: {error.message}</div>;
    }

    return (
        <div className={estilos.pagina}>
            <div className={estilos.conteudo}>
                <p className={estilos.texto}>Escola e Faculdade de Tecnologia Senai “Roberto Mange”</p>
                <div className={estilos.retangulo}>
                    <Localizacao pontos={pontos}/>
                </div>
                <p className={estilos.texto}>Rua Pastor Cicero Canuto de Lima, 71 São Bernardo - Vila Rialto, Campinas - SP, 13036-210</p>
            </div>
        </div>
    );
}
