import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import estilos from './Cadastro.module.css';
import logoProjeto from '../assets/logoProjeto.PNG';
import { Cabecalho } from "../Componentes/Cabecalho";
import axios from "axios";

const schemaCadastro = z.object({
    usuario: z.string().min(5, 'O mínimo de caracteres é 5!').max(10, 'O máximo de caracteres é 10!'),
    email: z.string().min(5, 'O mínimo de caracteres é 10!'),
    senha: z.string().min(8, 'Informe 8 caracteres!').max(8, 'O máximo de caracteres é 8!'),
    confirmarSenha: z.string()
});

export function Cadastro() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: zodResolver(schemaCadastro)
    });

    const senha = watch('senha');
    const confirmarSenha = watch('confirmarSenha');
    const usuario = localStorage.getItem('username');

    async function handleCadastro(data) {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('https://anabeatriztorrecilas.pythonanywhere.com/api/create_user', {
                username: data.usuario,
                email: data.email,
                password: data.senha
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Usuário cadastrado com sucesso:", response.data);
            alert("Usuário cadastrado com sucesso!");
            navigate('/inicial');
        } catch (error) {
            console.error("Erro no cadastro:", error);
        }
    }

    return (
        <div>
            <Cabecalho></Cabecalho>
            <div className={estilos.container}>
                <form className={estilos.formulario} onSubmit={handleSubmit(handleCadastro)}>
                    <img src={logoProjeto} alt="Logo do Projeto" className={estilos.logo} />
                    <p className={estilos.titulo}>Olá, {usuario}!<br/>Faça o cadastro de outro usuário aqui no Projeto Integrador Senai:</p>
                    
                    <input className={estilos.campo}
                        {...register('usuario')} placeholder="Username"
                    />
                    {errors.usuario && (
                        <p className={estilos.mensagem}>{errors.usuario.message}</p>
                    )}

                    <input className={estilos.campo}
                        {...register('email')} placeholder="Email Address"
                    />
                    {errors.usuario && (
                        <p className={estilos.mensagem}>{errors.email.message}</p>
                    )}

                    <input className={estilos.campo}
                        type="password"
                        {...register('senha')} placeholder="Senha"
                    />
                    {errors.senha && (
                        <p className={estilos.mensagem}>{errors.senha.message}</p>
                    )}
                    <input className={estilos.campo}
                        type="password"
                        {...register('confirmarSenha')} placeholder="Confirmar Senha"
                    />
                    {errors.confirmarSenha && (
                        <p className={estilos.mensagem}>{errors.confirmarSenha.message}</p>
                    )}
                    {senha !== confirmarSenha && (
                        <p className={estilos.mensagem}>As senhas não coincidem.</p>
                    )}
                    <button type="submit" className={estilos.botao}>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
