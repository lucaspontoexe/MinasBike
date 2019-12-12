import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import TextBox from '../../components/TextBox';
import Error from '../../components/Error';

import api from '../../services/api';
import logo from '../../assets/images/logo-white.png';
import './styles.css';

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        api.post('/sessions', {
            email,
            password,
        })

            .then(response => {
                localStorage.setItem('token', response.data.token);
                history.push('/produtos');
            })

            .catch(err => {
                setError(err.response.data.error);
            });
    }

    return (
        <>
            {error && <Error>{error}</Error>}

            <div className="login-screen">
                <form className="login-container" onSubmit={handleSubmit}>
                    <div className="logo-container">
                        <img src={logo} alt="Minas Bike logo" />
                    </div>

                    <TextBox
                        name="user"
                        type="email"
                        // label="Login"
                        placeholder="E-mail"
                        required
                        autoFocus
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />

                    <TextBox
                        name="password"
                        type="password"
                        // label="Password"
                        placeholder="Senha"
                        required
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />

                    <Button type="submit" color="#8ee88c">
                        Log in
                    </Button>
                    <Link to="/cadastrar">Sign in </Link>
                </form>
            </div>
        </>
    );
}
