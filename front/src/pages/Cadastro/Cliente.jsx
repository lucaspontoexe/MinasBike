import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Header from 'components/Header';
import Button from 'components/Button';
import Error from 'components/Error';
import FormikInput from 'components/FormikInput';
import formatFieldErrors from 'utils/formatFieldErrors';
import api from 'services/api';

export default function CadastroCliente({ history }) {

  const [serverError, setServerError] = useState('');

  function handleSubmit(values, { setSubmitting, setErrors }) {
    setSubmitting(true);
    setServerError('');
    api.post('/clients', values)

      .then(() => {
        history.push('/clientes');
      })

      .catch(err => {
        console.log(err);

        const { data } = err.response;
        if (data.message) setErrors(formatFieldErrors(data));
        else setServerError('Erro interno do servidor');
      })
      .finally(setSubmitting(false));
  }

  return (
    <div className="tela tela-cadastro">
      <Header>Cadastrar Cliente</Header>

      <Formik
        initialValues={{ name: '', phone: '', email: '', cpf: '', address: '', birthday: '' }}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormikInput required type="text" name="name" label="Nome" />
          <FormikInput required type="tel" name="phone" label="Telefone" />
          <FormikInput required type="email" name="email" label="E-mail" />
          <FormikInput name="cpf" label="CPF" />
          <FormikInput required name="address" label="Endereço" />
          <FormikInput required type="date" name="birthday" label="Data de Nascimento" />

          <div className="buttons">
            <Button type="reset" color="#DC2438" onClick={() => history.replace('/clientes')}>
              Cancelar
            </Button>
            <Button type="submit" color="#30CC57">
              Cadastrar
            </Button>
          </div>
          {serverError !== '' && <Error>{serverError}</Error>}
        </Form>
      </Formik>

      {/* {displayModal && (
        <Modal
          type="confirmation"
          onClose={() => setDisplayModal(false)}
          onConfirm={handleSubmit}
        />
      )} */}
    </div>
  );
}
