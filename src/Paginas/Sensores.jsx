import React, { useState, useEffect } from "react";
import axios from "axios";
import { Cabecalho } from '../Componentes/Cabecalho';
import { Link } from "react-router-dom";
import { FaPencilAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Filtro } from "../Componentes/Filtro";
import estilos from './Sensores.module.css';
import imagemSENAI from '../assets/imagemSENAI.jpg';

export function Sensor() {
    const [sensores, setSensores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Função para atualizar os sensores filtrados
    const atualizarSensoresFiltrados = (sensoresFiltrados) => {
        setSensores(sensoresFiltrados); 
    };


    useEffect(() => {
        async function fetchSensores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('https://anabeatriztorrecilas.pythonanywhere.com/api/sensores/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSensores(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false)
            }
        }
        fetchSensores();
    }, []);

    if (loading) {
        return <div><p>Carregando...</p></div>
    }
    if (error) {
        return <div>Erro ao carregar os dados: {error.message}</div>
    }

    return (
        <div>
            <Cabecalho />
            <div className={estilos.container} style={{ '--imagem-fundo': `url(${imagemSENAI})` }}>
                <h1>Monitoramento de Sensores<br></br>Senai “Roberto Mange”</h1>
                <Filtro atualizarSensoresFiltrados={atualizarSensoresFiltrados} /> 
                <div className={estilos.sensoresContainer}>
                    {sensores.map(sensor => (
                        <div key={sensor.id} className={estilos.sensor}>
                            <h3>ID: {sensor.id} 
                                <Link to={`/alterarsensor/${sensor.id}`}>
                                    <FaPencilAlt color="#CCCCCC" style={{ marginLeft: '10px' }}/>
                                </Link>
                            </h3>
                            <p>Tipo: {sensor.tipo}</p>
                            <p>Responsável: {sensor.responsavel}</p>
                            <p>Longitude: {sensor.longitude}</p>
                            <p>Latitude: {sensor.latitude}</p>
                            <p>
                                <span className={estilos.localizacao}>
                                    <FaMapMarkerAlt color="#DE013F" style={{ marginRight: '8px' }} />
                                    Localização: {sensor.localizacao}</span>
                            </p>
                        </div>
                    ))}
                </div>
                <Link to="/cadastrosensor" className={estilos.botaoCadsensor}>+</Link>
            </div>
        </div>
    )
}
