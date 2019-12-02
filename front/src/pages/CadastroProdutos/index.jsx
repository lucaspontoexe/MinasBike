import React, { Component } from 'react';
import TextBox from '../../components/TextBox';
import Button from '../../components/Button';

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
                <div className="item">
                    <TextBox label="Quantidade por item" type="number" />
                    <TextBox label="Unidade de medida" type="text" />
                </div>
                <TextBox label="Preço" type="number" />
                <div className="infos">informações adicionais</div>
                <Button type="submit" color="#8EE88C">
                    Cadastrar
                </Button>
            </div>
        );
    }
}
