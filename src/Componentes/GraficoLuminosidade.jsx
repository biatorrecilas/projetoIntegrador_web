import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export function GraficoLuminosidade() {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchLuminosidadeData() {
            try {
                const token = localStorage.getItem('access_token');
                const requestData = {
                    sensor_id: 20,
                    valor_gte: 10,
                    valor_lt: 1000,
                    timestamp_gte: "2024-04-21T00:00:00",
                    timestamp_lt: "2024-04-22T00:00:00"
                };
                const response = await axios.post('https://anabeatriztorrecilas.pythonanywhere.com/api/luminosidade_filter/', requestData, {
                    params: {
                        limit: 5000 // Limitando para 5000 dados
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = response.data;
                const labels = data.map(item => item.timestamp);
                const valores = data.map(item => item.valor);
        
                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Luminosidade',
                            data: valores,
                            fill: false,
                            borderColor: '#FFD700',
                            backgroundColor: '#FFD700',
                            pointBackgroundColor: '#FFD700',
                            pointBorderColor: '#FFD700',
                            tension: 0.4
                        }
                    ]
                });
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchLuminosidadeData();        
        
    }, []);

    if (loading) {
        return <div><p>Carregando...</p></div>;
    }

    if (error) {
        return <div>Erro ao carregar os dados: {error.message}</div>;
    }

    return (
        <div style={{backgroundColor: 'black'}}>
            <p style={{color: 'white'}}>Este gráfico mostra a variação da luminosidade capturada pelo sensor na Coordenação Pedagógica,<br></br> no intervalo entre 10 e 1000 unidades, ao longo do dia 21 de abril de 2024.</p>
            <div style={{ width: '600px', height: '400px', margin: '0 auto', backgroundColor: 'black', padding: '20px', borderRadius: '10px' }}>
                {chartData && chartData.labels ? (
                    <Line 
                        data={chartData}
                        options={{
                            plugins: {
                                legend: {
                                    labels: {
                                        color: 'white' 
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: 'white' 
                                    },
                                    grid: {
                                        color: 'rgba(255, 255, 255, 0.2)' 
                                    }
                                },
                                y: {
                                    ticks: {
                                        color: 'white' 
                                    },
                                    grid: {
                                        color: 'rgba(255, 255, 255, 0.2)' 
                                    }
                                }
                            }
                        }}
                    />
                ) : (
                    <p style={{ color: 'white' }}>Carregando dados...</p>
                )}
            </div>
        </div>
    );
}
