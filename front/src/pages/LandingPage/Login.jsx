import React, { useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useAuth } from 'hooks/useAuth';
import Button from 'components/Button';
import Input from 'components/FormikInput';
import Error from 'components/Error';

import devlog from 'utils/devlog';
import formatFieldErrors from 'utils/formatFieldErrors';
import logo from 'assets/images/logo-white.png';
import emailIcon from 'assets/icons/email.svg';
import passwordIcon from 'assets/icons/password.svg';

function Login({ history }) {
  const auth = useAuth();
  const [serverError, setServerError] = useState('');

  function handleSubmit(values, { setSubmitting, setErrors }) {
    setSubmitting(true);
    setServerError('');
    auth
      .login(values)

      .then(() => {
        history.push('/produtos');
      })

      .catch(err => {
        devlog(err);

        const { data } = err.response;
        if (data.message) setErrors(formatFieldErrors(data));
        else setServerError('Erro interno do servidor');
      })
      .finally(setSubmitting(false));
  }

  return (
    <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
      <Form className="login-container">
        <div className="logo-container">
          <img src={logo} alt="Minas Bike logo" />
        </div>
        <Input name="email" type="email" placeholder="E-mail" required autoFocus icon={emailIcon} />
        <Input name="password" type="password" placeholder="Senha" required icon={passwordIcon} />
        <Button type="submit" color="#DC2438">
          Acessar
        </Button>

        <span>
          Ainda não tem conta? <Link to="/cadastrar">Registre-se</Link>
        </span>
        {serverError !== '' && <Error>{serverError}</Error>}
        {auth.token && <Redirect to="/produtos" />}
      </Form>
    </Formik>
  );
}

export default withRouter(Login);
