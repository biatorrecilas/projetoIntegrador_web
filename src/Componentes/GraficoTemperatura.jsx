import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export function GraficoTemperatura() {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTemperaturaData() {
            try {
                const token = localStorage.getItem('access_token');
                const requestData = {
                    sensor_id: 17,
                    valor_gte: 10,
                    valor_lt: 34,
                    timestamp_gte: "2024-04-01T00:00:00",
                    timestamp_lt: "2024-04-02T00:00:00"
                };
                const response = await axios.post('https://anabeatriztorrecilas.pythonanywhere.com/api/temperatura_filter/', requestData, {
                  params: {
                    limit: 5000 // Limitando para 1000 dados
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
                            label: 'Temperatura',
                            data: valores,
                            fill: false,
                            borderColor: '#DE013F',
                            backgroundColor: '#DE013F',
                            pointBackgroundColor: '#DE013F',
                            pointBorderColor: '#DE013F',
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
        fetchTemperaturaData();
        
    }, []);

    if (loading) {
        return <div><p>Carregando...</p></div>;
    }

    if (error) {
        return <div>Erro ao carregar os dados: {error.message}</div>;
    }

    return (
        <div style={{backgroundColor: 'black'}}>
            <p style={{color: 'white'}}>O gráfico apresenta a variação da temperatura registrada pelo sensor no Laboratório de Informática A103,<br></br> entre 10°C e 34°C, durante o período de 1 de abril de 2024. </p>
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
