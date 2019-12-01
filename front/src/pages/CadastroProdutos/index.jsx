import React, { Component } from 'react';
import TextBox from '../../components/TextBox';

export default class CadastroProdutos extends Component {
    render() {
        return (
            <div>
                Tela de Cadastro
                <TextBox label="Nome do Produto" type="text" />
                <TextBox
                    label="Categoria"
                    type="text"
                    list="categorias"
                    options={['Categoria A', 'Categoria B', 'Peças']}
                />
                <TextBox
                    label="Fornecedor"
                    type="text"
                    list="fornecedores"
                    options={["Fulano's Bikes", "Fulano's Peças"]}
                />
                <TextBox type="number" label="Código de Barras" />
                <TextBox
                    label="Marca"
                    type="text"
                    list="marcas"
                    options={[
                        'Shimano',
                        'Outra coisa',
                        'Mais marcas de Bicicleta',
                    ]}
                />
            </div>
        );
    }
}
