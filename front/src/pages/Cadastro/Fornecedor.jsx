import React, { useState } from 'react';
import Header from 'components/Header';
import TextBox from 'components/TextBox';
import SelectWithLabel from 'components/SelectWithLabel';
import api from 'services/api';
import useAuth from 'utils/useAuth';
import Button from 'components/Button';

export default function CadastroFornecedor() {
    //TODO: Procurar se alguma lib de form ajuda
    const [name, setName] = useState('');
    const [locationID, setLocationID] = useState(0);
    const [phone, setPhone] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');

    function handleSubmit() {
        api.post('/providers', useAuth, {
            name,
            phone,
            email,
            location_id: locationID,
            contact,
        });
    }

    return (
        <div className="tela tela-cadastro">
            <Header>Novo Fornecedor</Header>

            <form onSubmit={handleSubmit}>
                <TextBox
                    name="name"
                    label="Nome do Fornecedor"
                    required
                    value={name}
                    onChange={setName}
                />
                <SelectWithLabel
                    name="location"
                    label="Cidade - Estado"
                    required
                    onChange={opt => {
                        setLocationID(opt.value);
                    }}
                />
                <TextBox
                    name="contact"
                    label="Nome do Contato Principal"
                    required
                    value={contact}
                    onChange={setContact}
                />
                <TextBox
                    name="phone"
                    label="Telefone do contato"
                    type="tel"
                    required
                    value={phone}
                    onChange={setPhone}
                />
                <TextBox
                    name="email"
                    label="E-mail do contato principal"
                    type="email"
                    required
                    value={email}
                    onChange={setEmail}
                />
                <div className="buttons">
                    <Button
                        color="#DC2438"
                        onClick={() => this.props.history.replace('/fornecedores')}
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
