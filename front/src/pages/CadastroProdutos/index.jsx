import React, { Component } from 'react';
import api from '../../services/api';
import TextBox from '../../components/TextBox';
import Button from '../../components/Button';

export default class CadastroProdutos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            brand: '',
            price: null,
            code: null,
            quantity_per_unity: null,
            unity: '',
            id_category: 1,
            id_provider: 2,
        };
    }

    categoryData = {};
    providersData = {};

    handleChange = ({ target }) => {
        const isNumber = target.type === 'number';

        // if is an ID field, change according state and return

        this.setState({
            [target.name]: isNumber ? parseFloat(target.value) : target.value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const submitObject = {
            ...this.state,
            provider: undefined,
            category: undefined,
        };

        // maybe use delete?

        console.log('ohlord');
        console.log(submitObject);
    };

    makeIDTable(objects) {
        let finalArray = [];

        for (let entry of objects) {
            finalArray.push({ [entry.name]: entry.id });
        }
        return finalArray;
    }

    componentDidMount() {
        // api.get('/products').then(response => console.log(response.data));

        // TODO: maybe use async/await?
        api.get('/providers').then(response => {
            this.providersData = this.makeIDTable(response.data);
            console.log(this.providersData);
        });

        api.get('/categories').then(response => {
            this.categoryData = this.makeIDTable(response.data);
            console.log(this.categoryData);
        });
    }

    render() {
        return (
            <form
                className="cadastro-produtos"
                // usando capture no div inteiro. pode-se usar o handleChange em cada campo.
                onChangeCapture={event => this.handleChange(event)}
                onSubmit={this.handleSubmit}
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
                    list="providers"
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
            </form>
        );
    }
}
