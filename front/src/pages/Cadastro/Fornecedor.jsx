import React, { useState } from 'react';

import api from 'services/api';
import useAuth from 'utils/useAuth';

import Header from 'components/Header';
import TextBox from 'components/TextBox';
import Button from 'components/Button';
import LocationSelect from 'components/LocationSelect/index.jsx';

export default function CadastroFornecedor({ history }) {
    //TODO: Procurar se alguma lib de form ajuda
    const [formData, setFormData] = useState({});

    function handleSubmit(event) {
        event.preventDefault();
        api.post('/providers', useAuth, formData);
    }

    function handleChange({ target }) {
        setFormData({ ...formData, [target.name]: target.value });
    }

    return (
        <div className="tela tela-cadastro">
            <Header>Novo Fornecedor</Header>

            <form onSubmit={handleSubmit}>
                <TextBox
                    name="name"
                    label="Nome do Fornecedor"
                    required
                    onChange={handleChange}
                />
                <LocationSelect
                    onChange={value =>
                        setFormData({ ...formData, location_id: value })
                    }
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
                    <Button
                        type="reset"
                        color="#DC2438"
                        onClick={() => history.replace('/fornecedores')}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" color="#30CC57">
                        Cadastrar
                    </Button>
                </div>
            </form>
        </div>
    );
}
