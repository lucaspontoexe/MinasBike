import React, { useState } from 'react';
import Button from '../../components/Button';
import TextBox from '../../components/TextBox';
import Error from '../../components/Error';

import api from '../../services/api';
import './styles.css';

export default function NovaConta({ history }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        api.post('/users', {
            name,
            email,
            password,
            password_confirmation,
        })

            .then(response => {
                //localStorage.setEmail('token', response.data.token);
                history.push('/');
            })

            .catch(err => {
                setError(err.response.data.error);
            });
    }

    return (
        <>
            {error && <Error>{error}</Error>}
            <br />
            <div className="login-screen">
                <form onSubmit={handleSubmit}>
                    <TextBox
                        name="name"
                        type="text"
                        label="Name"
                        required
                        autoFocus
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />

                    <TextBox
                        name="user"
                        type="email"
                        label="Login"
                        placeholder="user@example.com"
                        required
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />

                    <TextBox
                        name="password"
                        type="password"
                        label="Password"
                        required
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <TextBox
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        required
                        value={password_confirmation}
                        onChange={event => setConfirmPassword(event.target.value)}
                    />
                    <Button type="submit" color="#8ee88c">
                        Sign in
                    </Button>
                </form>
            </div>
        </>
    );
}
