import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import estilos from './Login.module.css';
import logoProjeto from '../assets/logoProjeto.PNG';
import axios from "axios";


const schemaLogin = z.object({
    usuario: z.string()
        .min(5, 'O mínimo de caracteres é 5!'),
    senha: z.string()
        .min(6, 'Informe 6 caracteres!')
});

export function Login() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaLogin)
    });

    async function obterDadosFormulario(data) {
        // lógica de login
        try{
            const response = await axios.post('https://anabeatriztorrecilas.pythonanywhere.com/api/token',{
                username: data.usuario,
                password: data.senha
            });
            const {access, refresh} = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('username', data.usuario);

            console.log(`Usuário: ${data.usuario}`);
            console.log(`Senha: ${data.senha}`);
            
            navigate('/inicial');
        }catch(error){
            console.log("Erro na autentificação: ", error)
            alert('Erro na autentificação! Confira se os dados são cadastrados e digitados corretamente.');
        }
    }

    return (
        <div className={estilos.container}>
            <form className={estilos.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
                <img src={logoProjeto} alt="Logo do Projeto" className={estilos.logo} />
                <p className={estilos.titulo}>Seja bem-vindo ao Projeto Integrador SENAI!</p>
                <input className={estilos.campo}
                    {...register('usuario')} placeholder="E-mail"
                />
                {errors.usuario && (
                    <p className={estilos.mensagem}>{errors.usuario.message}</p>
                )}
                <input className={estilos.campo}
                    type="password"
                    {...register('senha')} placeholder="Senha"
                />
                {errors.senha && (
                    <p className={estilos.mensagem}>{errors.senha.message}</p>
                )}
                
                <button type="submit" className={estilos.botao}>Entrar</button>
            </form>
        </div>
    );
}
