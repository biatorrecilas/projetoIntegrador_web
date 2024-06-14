import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

export function GraficoContador() {
    const [contador, setContador] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchContadorData() {
            try {
                const token = localStorage.getItem('access_token');
                const requestData = {
                    sensor_id: 70,
                    timestamp_gte: "2024-04-01T00:00:00",
                    timestamp_lt: "2024-04-30T00:00:00"
                };
                const response = await axios.post('https://anabeatriztorrecilas.pythonanywhere.com/api/contador_filter/', requestData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = response.data.results;
                const count = response.data.count;
        
                setContador(count); 
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchContadorData();
    }, []);

    if (loading) {
        return <div><p>Carregando...</p></div>;
    }

    if (error) {
        return <div>Erro ao carregar os dados: {error.message}</div>;
    }

    const data = {
        labels: ['Total de Registros no Contador'],
        datasets: [
            {
                label: 'Total',
                data: [contador],
                backgroundColor: '#36A2EB',
                borderColor: '#36A2EB',
                borderWidth: 1
            }
        ]
    };

    return (
        <div style={{backgroundColor: 'black', color: 'white'}}>
            <p>O gráfico de barras apresenta o total de registros capturados pelo sensor de ID 70<br></br> durante o mês de abril de 2024. O período considerado é de 1 de abril até 30 de abril.</p>
            <h2>Total de registros: {contador}</h2>
            <div style={{ width: '400px', height: '400px', margin: '20px auto' }}>
                <Bar data={data} />
            </div>
        </div>
    );
}
