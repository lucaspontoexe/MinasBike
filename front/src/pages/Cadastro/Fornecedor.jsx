import React from 'react';
import Header from 'components/Header';
import TextBox from 'components/TextBox';
import SelectWithLabel from 'components/SelectWithLabel';

export default function CadastroFornecedor() {
    return (
        <div className="tela tela-cadastro">
            <Header>Novo Fornecedor</Header>

            <TextBox name="name" label="Nome do Fornecedor" required />
            <SelectWithLabel name="location" label="Cidade - Estado" required />
            <TextBox
                name="name"
                label="Nome do Contato Principal"
                required
            />
            <TextBox
                name="phone"
                label="Telefone do contato"
                type="tel"
                required
            />
            <TextBox
                name="email"
                label="E-mail do contato principal"
                type="email"
                required
            />
        </div>
    );
}
