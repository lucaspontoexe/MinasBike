import React, { useState } from 'react';
import Button from '../../components/Button';
import TextBox from '../../components/TextBox';

import api from '../../services/api';
import './styles.css';

export default function Login({ history }) {
    // dá-lhe hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        // dá pra usar try/catch (com async/await) ou só then/catch
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
