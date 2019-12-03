import React, { Component } from 'react';
import TextBox from '../../components/TextBox';
import Button from '../../components/Button';

export default class CadastroProdutos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            brand: '',
            price: undefined,
            code: undefined,
            quantity_per_unity: undefined,
            unity: 'unid.',
            id_category: 1,
            id_provider: 2,
        };
    }

    handleChange = ({ target }) => {
        const isNumber = target.type === 'number';

        this.setState({
            [target.name]: isNumber ? parseFloat(target.value) : target.value,
        });

        // console.log(this.state);
    };

    render() {
        return (
            <div
                className="cadastro-produtos"
                // usando capture no div inteiro. pode-se usar o handleChange em cada campo.
                onChangeCapture={event => this.handleChange(event)}
            >
                Tela de Cadastro
                <TextBox label="Nome do Produto" type="text" name="name" />
                <TextBox
                    name="category"
                    label="Categoria"
                    type="text"
                    list="categorias"
                    options={['Categoria A', 'Categoria B', 'Peças']}
                />
                <TextBox
                    name="provider"
                    label="Fornecedor"
                    type="text"
                    list="fornecedores"
                    options={["Fulano's Bikes", "Fulano's Peças"]}
                />
                <TextBox name="code" type="number" label="Código de Barras" />
                <TextBox
                    name="brand"
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
                    <TextBox
                        name="quantity_per_unity"
                        label="Quantidade por item"
                        type="number"
                    />
                    <TextBox
                        name="unity"
                        label="Unidade de medida"
                        type="text"
                    />
                </div>
                <TextBox name="price" label="Preço" type="number" step="0.01" />
                <div className="infos">informações adicionais</div>
                <Button type="submit" color="#8EE88C">
                    Cadastrar
                </Button>
            </div>
        );
    }
}
