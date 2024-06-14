import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import estilos from './AlteraSensor.module.css';
import { Cabecalho } from "../Componentes/Cabecalho";
import logoProjeto from '../assets/logoProjeto.PNG';
import { FaTrashCan } from "react-icons/fa6";

const schemaAlteraSensor = z.object({
    tipo: z.string().optional(), 
    mac_address: z.string().max(25, "Deve ter no máximo 25 caracteres").nullable(),
    latitude: z.number().refine(val => !isNaN(parseFloat(val)), 'Latitude inválida'),
    longitude: z.number().refine(val => !isNaN(parseFloat(val)), 'Longitude inválida'),
    localizacao: z.string().max(100, 'Deve ter no máximo 100 caracteres'),
    responsavel: z.string().max(100, 'Deve ter no máximo 100 caracteres'),
    unidade_medida: z.string().max(20, 'Deve ter no máximo 20 caracteres'),
    status_operacional: z.boolean(),
    observacao: z.string().nullable()
});

export function AlteraSensor() {
    const navigate = useNavigate();
    const { id } = useParams(); // pega o id do sensor 
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(schemaAlteraSensor) // valida o schema definido para a alteração
    });

    const obterDadosSensor = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`https://anabeatriztorrecilas.pythonanywhere.com/api/sensores/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const sensorData = response.data;
            Object.keys(sensorData).forEach(key => {
                setValue(key, sensorData[key]);
            });
        } catch (error) {
            console.log('Erro ao obter o sensor', error);
        }
    };

    useEffect(() => {
        obterDadosSensor();
    }, [id]);

    const onSubmit = async (data) => {
        console.log("Dados inputados no formulário para o PUT: ", data);
        try {
            const token = localStorage.getItem('access_token');
            const url = `https://anabeatriztorrecilas.pythonanywhere.com/api/sensores/${id}/`;
            await axios.put(url, data, { 
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert("Sensor alterado com sucesso!");
            navigate('/sensores');
        } catch (error) {
            console.error('Erro ao alterar o sensor: ', error);
            alert('Erro ao alterar o sensor: ', error);
        }
    };

    const excluirSensor = async () => {
        if (window.confirm("Tem certeza de que deseja excluir este sensor?")) {
            try {
                const token = localStorage.getItem('access_token');
                const url = `https://anabeatriztorrecilas.pythonanywhere.com/api/sensores/${id}/`;
                await axios.delete(url, { 
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                alert("Sensor excluído com sucesso!");
                navigate('/sensores');
            } catch (error) {
                console.error('Erro ao excluir o sensor: ', error);
                alert('Erro ao excluir o sensor: ', error);
            }
        }
    };

    return (
        <div>
            <Cabecalho></Cabecalho>
            <div className={estilos.container}>
                <form className={estilos.formulario} onSubmit={handleSubmit(onSubmit)}> 
                    <img src={logoProjeto} alt="Logo do Projeto" className={estilos.logo} />
                    <h1 className={estilos.titulo}>Alteração de Sensor</h1>

                    <label>Tipo de Sensor</label>
                    <select {...register('tipo')} className={estilos.campo}>
                        <option value="">Selecione um Tipo</option>
                        <option value="Temperatura">Temperatura</option>
                        <option value="Contador">Contador</option>
                        <option value="Luminosidade">Luminosidade</option>
                        <option value="Umidade">Umidade</option>
                    </select>
                    {errors.tipo && <p className={estilos.mensagem}>{errors.tipo.message}</p>}

                    <label>Mac Address</label>
                    <input
                        {...register('mac_address')}
                        className={estilos.campo}
                        placeholder="mac_address"
                    />
                    {errors.mac_address && <p className={estilos.mensagem}>{errors.mac_address.message}</p>}

                    <label>Latitude</label>
                    <input
                        {...register('latitude')}
                        className={estilos.campo}
                        placeholder="latitude"
                    />
                    {errors.latitude && <p className={estilos.mensagem}>{errors.latitude.message}</p>}

                    <label>Longitude</label>
                    <input
                        {...register('longitude')}
                        className={estilos.campo}
                        placeholder="longitude"
                    />
                    {errors.longitude && <p className={estilos.mensagem}>{errors.longitude.message}</p>}

                    <label>Localização</label>
                    <input
                        {...register('localizacao')}
                        className={estilos.campo}
                        placeholder="localizacao"
                    />
                    {errors.localizacao && <p className={estilos.mensagem}>{errors.localizacao.message}</p>}

                    <label>Responsável</label>
                    <input
                        {...register('responsavel')}
                        className={estilos.campo}
                        placeholder="responsavel"
                    />
                    {errors.responsavel && <p className={estilos.mensagem}>{errors.responsavel.message}</p>}

                    <label>Unidade de Medida</label>
                    <input
                        {...register('unidade_medida')}
                        className={estilos.campo}
                        placeholder="unidade_medida"
                    />
                    {errors.unidade_medida && <p className={estilos.mensagem}>{errors.unidade_medida.message}</p>}

                    <label>Observação</label>
                    <textarea {...register('observacao')} className={estilos.campo} placeholder="Observação"></textarea>
                    {errors.observacao && <p className={estilos.mensagem}>{errors.observacao.message}</p>}

                    <label className={estilos.check}>
                        Satus Operacional:
                        <input {...register('status_operacional')} type="checkbox"></input>
                    </label>

                    <button type="submit" className={estilos.botao}>Alterar</button>
                    
                    <button type="button" onClick={excluirSensor} className={estilos.botaoExcluir}><FaTrashCan></FaTrashCan> Excluir Sensor</button>
                </form>
            </div>
        </div>
    )
}
