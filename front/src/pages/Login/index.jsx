import React, { useState } from 'react';
import Button from '../../components/Button';
import TextBox from '../../components/TextBox';

import api from '../../services/api';
import './styles.css';

export default function Login({ history }) {
    // dá-lhe hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        // dá pra usar try/catch ou then/catch
        const response = await api.post('/sessions', {
            email,
            password,
        });

        console.log(response.data);
        const { token } = response.data;
        localStorage.setItem('token', token);
        history.push('/lista');
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
                    // saudades do 2-way binding Daquele framework
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
        </div>
    );
}
