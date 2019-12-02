import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import TextBox from '../../components/TextBox';
import './styles.css';

export default function Login({ history }) {
    function handleSubmit() {
        history.push('/lista');
    }

    return (
        <div class="login-screen">
            <form onSubmit={handleSubmit}>
                <TextBox
                    name="user"
                    type="email"
                    label="Login"
                    placeholder="user@example.com"
                    required
                    autoFocus
                />

                <TextBox
                    name="password"
                    type="password"
                    label="Senha"
                    required
                />

                <Button type="submit" color="#8ee88c">
                    Entrar
                </Button>
            </form>
            <Link to="/cadastrar">Criar conta</Link>
        </div>
    );
}
