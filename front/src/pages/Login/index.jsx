import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import TextBox from 'components/TextBox';
import Error from 'components/Error';

import api from 'services/api';
import logo from 'assets/images/logo-white.png';
import emailIcon from 'assets/icons/email.svg';
import passwordIcon from 'assets/icons/password.svg';
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
                sessionStorage.setItem('token', response.data.token);
                // sessionStorage.setItem('username', response.data.user.name);
                history.push('/produtos');
            })

            .catch(err => {
                //TODO: HIGHLIGHT DE CAMPOS
                setError(err.response.data[0].message)
            });
    }

    function useIcon(icon) {
        return {
            paddingLeft: 40,
            backgroundImage: `url(${icon})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 10,
        };
    }

    return (
        <>
            {error !== '' && <Error>{error}</Error>}

            <div className="login-screen">
                <form
                    className="login-container"
                    onSubmit={handleSubmit}
                    onChangeCapture={() => setError('')}
                >
                    <div className="logo-container">
                        <img src={logo} alt="Minas Bike logo" />
                    </div>

                    <TextBox
                        name="user"
                        type="email"
                        placeholder="E-mail"
                        required
                        autoFocus
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        style={useIcon(emailIcon)}
                    />

                    <TextBox
                        name="password"
                        type="password"
                        placeholder="Senha"
                        required
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        style={useIcon(passwordIcon)}
                    />

                    <Button type="submit" color="#DC2438">
                        Acessar
                    </Button>

                    <span>
                        Ainda não tem conta?{' '}
                        <Link to="/cadastrar">Registre-se</Link>
                    </span>
                </form>
            </div>
        </>
    );
}
