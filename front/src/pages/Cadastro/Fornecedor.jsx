import React, { useState } from 'react';
import Header from 'components/Header';
import TextBox from 'components/TextBox';
import SelectWithLabel from 'components/SelectWithLabel';

export default function CadastroFornecedor() {
    //TODO: Procurar se alguma lib de form ajuda
    const [name, setName] = useState('');
    const [locationID, setLocationID] = useState(0);
    const [phone, setPhone] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div className="tela tela-cadastro">
            <Header>Novo Fornecedor</Header>

            <form>
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
                    value={locationID}
                    onChange={setLocationID}
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
            </form>
        </div>
    );
}
