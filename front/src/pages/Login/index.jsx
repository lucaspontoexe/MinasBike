import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import Button from 'components/Button';
import TextBox from 'components/TextBox';
import Error from 'components/Error';

import api from 'services/api';
import logo from 'assets/images/logo-white.png';
import emailIcon from 'assets/icons/email.svg';
import passwordIcon from 'assets/icons/password.svg';
import './styles.css';

export default function Login({ history }) {
    const [serverError, setServerError] = useState('');

    function handleSubmit(values, { setSubmitting, setErrors }) {
        setSubmitting(true);
        setServerError('');
        api.post('/sessions', values)

            .then(response => {
                sessionStorage.setItem('token', response.data.token);
                api.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${response.data.token}`;
                history.push('/produtos');
            })

            .catch(err => {
                const { data } = err.response;
                if (data.message)
                    setErrors(
                        data.fields.map(field => {
                            return { [field]: data.message };
                        })
                    );
                else setServerError('Erro interno do servidor');
            })
            .finally(setSubmitting(false));
    }

    const Input = props => {
        const [, meta, helpers] = useField(props.name);
        return (
            <TextBox
                {...props}
                error={meta.error}
                onChange={e => helpers.setValue(e.target.value)}
            />
        );
    };

    return (
        <div className="login-screen">
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={handleSubmit}
            >
                <Form className="login-container">
                    <div className="logo-container">
                        <img src={logo} alt="Minas Bike logo" />
                    </div>
                    <Input
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        required
                        autoFocus
                        icon={emailIcon}
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Senha"
                        required
                        icon={passwordIcon}
                    />
                    <Button type="submit" color="#DC2438">
                        Acessar
                    </Button>

                    <span>
                        Ainda não tem conta?{' '}
                        <Link to="/cadastrar">Registre-se</Link>
                    </span>
                </Form>
            </Formik>
            {serverError !== '' && <Error>{serverError}</Error>}
        </div>
    );
}
