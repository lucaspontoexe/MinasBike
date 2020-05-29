import React, { useState } from 'react';

import api from 'services/api';


import Header from 'components/Header';
import TextBox from 'components/TextBox';
import Button from 'components/Button';
import LocationSelector from 'components/LocationSelector/index.jsx';
import Modal from 'components/Modal';

export default function CadastroFornecedor({ history }) {
  const [formData, setFormData] = useState({});
  const [displayModal, setDisplayModal] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    await api.post('/providers', formData);
    history.push('/fornecedores');
  }

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  // Formik não parece ser tão interessante pra essa página.

  return (
    <div className="tela tela-cadastro">
      <Header>Novo Fornecedor</Header>

      <form
        action="#"
        onSubmit={event => {
          event.preventDefault();
          setDisplayModal(true);
        }}
      >
        <TextBox name="name" label="Nome do Fornecedor" required onChange={handleChange} />
        <LocationSelector
          required
          onChange={value => setFormData({ ...formData, location_id: value })}
        />
        <TextBox
          name="contact"
          label="Nome do Contato Principal"
          required
          onChange={handleChange}
        />
        <TextBox
          name="phone"
          label="Telefone do contato"
          type="tel"
          required
          onChange={handleChange}
        />
        <TextBox
          name="email"
          label="E-mail do contato principal"
          type="email"
          required
          onChange={handleChange}
        />
        <div className="buttons">
          <Button type="reset" color="#DC2438" onClick={() => history.replace('/fornecedores')}>
            Cancelar
          </Button>
          <Button type="submit" color="#30CC57">
            Cadastrar
          </Button>
        </div>
      </form>

      {displayModal && (
        <Modal
          type="confirmation"
          onClose={() => setDisplayModal(false)}
          onConfirm={handleSubmit}
        />
      )}
    </div>
  );
}
