import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Button from 'components/Button';
import Input from './Input';
import Error from 'components/Error';

import api from 'services/api';
import formatFieldErrors from 'utils/formatFieldErrors';
import './styles.css';

export default function Registro({ history }) {
    const [serverError, setServerError] = useState('');

    function validate({password, password_confirmation}) {
        const errors = {}
        if (password !== password_confirmation) errors.password = "As senhas não coincidem"
        return errors;
    }

    function handleSubmit(values, { setSubmitting, setErrors }) {
        setSubmitting(true);
        setServerError('');
        api.post('/users', values)

            .then(response => {
                //TODO: "tela" de confirmação
                history.replace('/');
            })

            .catch(err => {
                const { data } = err.response;
                if (data.message) setErrors(formatFieldErrors(data));
                else setServerError('Erro interno do servidor');
            })

            .finally(setSubmitting(false));
    }

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            }}
            validate={validate}
            onSubmit={handleSubmit}
        >
            <Form className="login-container">
                <Input
                    name="name"
                    type="text"
                    label="Nome"
                    placeholder="João"
                    required
                    autoFocus
                />

                <Input
                    name="email"
                    type="email"
                    label="E-mail"
                    placeholder="user@example.com"
                    required
                />

                <Input
                    name="password"
                    type="password"
                    label="Senha"
                    placeholder="*******"
                    required
                />
                <Input
                    name="password_confirmation"
                    type="password"
                    label="Confirmar Senha"
                    placeholder="*******"
                    required
                />
                <Button type="submit" color="#DC2438">
                    Registrar
                </Button>

                <span>
                    Já possui uma conta? <Link to="/">Fazer Login</Link>
                </span>
                {serverError !== '' && <Error>{serverError}</Error>}
            </Form>
        </Formik>
    );
}
