import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Button from 'components/Button';
import Input from './Input';
import Error from 'components/Error';

import iconApproved from 'assets/icons/approved-signal.svg';

import api from 'services/api';
import formatFieldErrors from 'utils/formatFieldErrors';

function Registro({ history }) {
  const [serverError, setServerError] = useState('');
  const [isSignupDone, setIsSignupDone] = useState(false);

  function validate({ password, password_confirmation }) {
    const errors = {};
    if (password !== password_confirmation)
      errors.password_confirmation = 'As senhas não coincidem';
    return errors;
  }

  function handleSubmit(values, { setSubmitting, setErrors }) {
    setSubmitting(true);
    setServerError('');
    api
      .post('/users', values)

      .then(() => {
        setIsSignupDone(true);
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
        login: '',
        email: '',
        password: '',
        password_confirmation: '',
      }}
      validate={validate}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      <Form className="login-container">
        <Input name="name" type="text" label="Nome" placeholder="João" required autoFocus />

        <Input name="login" type="text" label="Login" required />
        <Input name="email" type="email" label="E-mail" placeholder="user@example.com" required />

        <Input name="password" type="password" label="Senha" placeholder="*******" required />
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

        {isSignupDone && (
          <div className="success">
            <img src={iconApproved} alt="Aprovado" />

            <div className="text">
              <h2>Cadastro realizado</h2>
              <span>O administrador irá liberar o acesso.</span>
            </div>

            <Button color="#777" type="reset" onClick={() => history.replace('/')}>
              Voltar
            </Button>
          </div>
        )}
      </Form>
    </Formik>
  );
}
export default withRouter(Registro);
