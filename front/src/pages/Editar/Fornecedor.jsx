import React, { useEffect, useState } from 'react';
import api from 'services/api';
import Header from 'components/Header';
import { Formik, Form } from 'formik';
import Button from 'components/Button';

export default function EditarFornecedor(props) {
  const { id } = props.match.params;

  const [providerData, setProviderData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    api.get('/providers', { params: { id } }).then(response => {
      setProviderData(response.data[0]);
      setIsLoaded(true);
    });
  }, [id]);

  return (
    <div className="tela detalhes-fornecedor">
      <Header>Editar Fornecedor</Header>

      <Formik initialValues={providerData}>
        <Form>
          {/* FormikInput */}

          <div className="buttons">
            <Button type="reset" color="#DC2438" onClick={() => props.history.pop()}>
              Voltar
            </Button>
            <Button type="submit" color="#30CC57">
              Salvar
            </Button>
            <pre>is loaded: {JSON.stringify(isLoaded)}</pre>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
