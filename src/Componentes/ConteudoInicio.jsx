import React, { useState, useEffect } from 'react';
import estilos from './ConteudoInicio.module.css';
import imagemSENAI from '../assets/imagemSENAI.jpg';

export function ConteudoInicio() {
    const [temperatura, setTemperatura] = useState(null);
    const [dataHora, setDataHora] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const usuario = localStorage.getItem('username');

    useEffect(() => {
        const buscarTemperatura = async () => {
            try {
                const resposta = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Campinas,BR&appid=498d583deec6220889bd84df55ac7ae8&units=metric');
                const dados = await resposta.json();
                setTemperatura(dados.main.temp);
            } catch (erro) {
                console.error('Erro ao buscar a temperatura! ', erro);
            }
        };

        const buscarDataHora = () => {
            const dataAtual = new Date();
            const options = { timeZone: 'America/Sao_Paulo', hour12: false};
            const diaSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
            const diaDaSemana = diaSemana[dataAtual.getDay()];
            const diaDoMes = dataAtual.getDate();
            const mes = dataAtual.toLocaleString('pt-BR', { month: 'long' });
            const ano = dataAtual.getFullYear();
            const hora = String(dataAtual.getHours()).padStart(2, '0');
            const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
            const dataHoraFormatada = `${hora}:${minutos} ${diaDaSemana}, ${diaDoMes} de ${mes} de ${ano}`;
        
            setDataHora(dataHoraFormatada);
        };
        
        buscarTemperatura();
        buscarDataHora();

        // intervalo de atualização 
        const temperaturaInterval = setInterval(buscarTemperatura, 600000);
        const dataHoraInterval = setInterval(buscarDataHora, 60000); 

        // limpar os intervalos 
        return () => {
            clearInterval(temperaturaInterval);
            clearInterval(dataHoraInterval);
        };
    }, []);

    const abrirModal = () => {
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
    };

    return (
        <main className={estilos.container} style={{ '--imagem-fundo': `url(${imagemSENAI})` }}>
            <h1 style={{ marginTop: '100px' }}>Campinas,   {temperatura !== null ? `${temperatura}°C` : 'Carregando...'}</h1>
            <div className={estilos.linha}></div>
            <h2>{dataHora !== null ? dataHora : 'Carregando...'}</h2>
            <button className={estilos.botao} onClick={abrirModal}>Bem vindo, {usuario}!</button>
            {modalAberto && (
                <div className={estilos.modal}>
                    <div className={estilos.modalConteudo}>
                        <h2 className={estilos.modalTitulo}>Sobre o Projeto</h2>
                        <p>Desenvolvido por: Ana Beatriz Nardy Torrecilas</p>
                        <p>Curso: 2DSMB-A</p>
                        <p>O Projeto Integrador do segundo semestre do Curso de Desenvolvimento de Sistemas tem como objetivo monitorar as informações de sensores de temperatura, luminosidade, umidade e contagem no SENAI "Roberto Mange". Para isso, é utilizado um código BackEnd desenvolvido em Django com Python e um FrontEnd em React.</p>
                        <button className={estilos.botaoFechar} onClick={fecharModal}>Fechar</button>
                    </div>
                </div>
            )}
        </main>
    );
}
