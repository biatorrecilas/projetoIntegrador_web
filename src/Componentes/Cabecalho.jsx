import estilos from './Cabecalho.module.css'
import LOGOSENAI from '../assets/LOGOSENAI.png';
import { Link, useLocation  } from 'react-router-dom'; 

export function Cabecalho(){
    const location = useLocation();

    const handleLogout = async () => {
        try {
            const response = await fetch('admin/logout/', {
                method: 'GET', 
                credentials: 'same-origin' 
            });
            if (response.ok) {
                window.location.href = '/'; // Redireciona para a página de login
            } else {
                console.error('Erro ao fazer logout:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return(
        <header className={estilos.conteiner}>
            <img src={LOGOSENAI} alt="Logo Senai" className={estilos.logo}/>
            <div className={estilos.links}>
                <Link to="/inicial" className={location.pathname === '/inicial' ? estilos.active : ''}>
                    <p>Início</p>
                </Link>
                <Link to="/mapa" className={location.pathname === '/mapa' ? estilos.active : ''}>
                    <p>Mapeamento</p>
                </Link>
                <Link to="/sensores" className={location.pathname === '/sensores' ? estilos.active : ''}>
                    <p>Monitoramento</p>
                </Link>
                <Link to="/graficos" className={location.pathname === '/graficos' ? estilos.active : ''}>
                    <p>Gráficos</p>
                </Link>
                <Link to="/cadastro" className={location.pathname === '/cadastro' ? estilos.active : ''}>
                    <p>Adicionar User</p>
                </Link>
                
                <p onClick={handleLogout}>Sair</p>
            </div>
        </header>
    );
}
