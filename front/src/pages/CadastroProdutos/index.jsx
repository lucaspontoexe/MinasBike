import React, { Component } from 'react';
import TextBox from '../../components/TextBox';

export default class CadastroProdutos extends Component {
    render() {
        return (
            <div>
                Tela de Cadastro
                <TextBox
                    label="hmm"
                    list="teste"
                    options={['Carro', 'Moto', 'Bicicleta', 'Qualquer Coisa']}
                />
            </div>
        );
    }
}
