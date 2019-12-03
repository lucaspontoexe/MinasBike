import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import TextBox from '../../components/TextBox';

import api from '../../services/api';
import './styles.css';

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        api.post('/sessions', {
            email,
            password,
        })

            .then(response => {
                localStorage.setItem('token', response.data.token);
                history.push('/lista');
            })

            .catch(error => console.log(error.response));
    }

    return (
        <div className="login-screen">
            <form onSubmit={handleSubmit}>
                <TextBox
                    name="user"
                    type="email"
                    label="Login"
                    placeholder="user@example.com"
                    required
                    autoFocus
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <TextBox
                    name="password"
                    type="password"
                    label="Senha"
                    required
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />

                <Button type="submit" color="#8ee88c">
                    Entrar
                </Button>
            </form>
            <Link to="/cadastrar">Criar conta</Link>
        </div>
    );
}
