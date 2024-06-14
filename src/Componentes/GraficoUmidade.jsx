import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export function GraficoUmidade() {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUmidadeData() {
            try {
                const token = localStorage.getItem('access_token');
                const requestData = {
                    sensor_id: 2,
                    valor_gte: 10,
                    valor_lt: 80,
                    timestamp_gte: "2024-04-01T00:00:00",
                    timestamp_lt: "2024-04-02T00:00:00"
                };
                const response = await axios.post('https://anabeatriztorrecilas.pythonanywhere.com/api/umidade_filter/', requestData, {
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
                            label: 'Umidade',
                            data: valores,
                            fill: false,
                            borderColor: '#00CED1',
                            backgroundColor: '#00CED1',
                            pointBackgroundColor: '#00CED1',
                            pointBorderColor: '#00CED1',
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
        fetchUmidadeData();        
        
    }, []);

    if (loading) {
        return <div><p>Carregando...</p></div>;
    }

    if (error) {
        return <div>Erro ao carregar os dados: {error.message}</div>;
    }

    return (
        <div style={{backgroundColor: 'black'}}>
            <p style={{color: 'white'}}>Este gráfico ilustra a variação da umidade registrada pelo sensor de ID 2,<br></br> com valores entre 10% e 80%, durante o período de 1 de abril de 2024. </p>
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
