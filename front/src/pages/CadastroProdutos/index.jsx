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
            categories: [],
            providers: [],
        };
    }

    // ID tables
    categoryData = {};
    providersData = {};

    handleChange = ({ target }) => {
        const isNumber = target.type === 'number';

        // if is an ID field, change according state and return

        this.setState({
            [target.name]: isNumber ? parseFloat(target.value) : target.value,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        const submitObject = {
            ...this.state,
            // i'd add ID to state if textbox returned a number
            categories: undefined,
            providers: undefined,
            category: undefined,
            provider: undefined,

            id_provider: this.providersData[this.state.provider],
            id_category: this.categoryData[this.state.category],
        };

        console.log('posting: ', submitObject);
        const response = await api.post('/products', submitObject, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log(response);
    };

    makeIDTable(objects) {
        let finalObj = {};

        for (let entry of objects) {
            finalObj[entry.name] = entry.id;
        }
        return finalObj;
    }

    componentDidMount() {
        // TODO: maybe use async/await?
        api.get('/providers').then(response => {
            this.providersData = this.makeIDTable(response.data);
            this.setState({ providers: Object.keys(this.providersData) });
            console.log(this.state.providers);
        });

        api.get('/categories').then(response => {
            this.categoryData = this.makeIDTable(response.data);
            this.setState({ categories: Object.keys(this.categoryData) });
            console.log(this.state.categories);
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
                    options={this.state.categories}
                />
                <TextBox
                    name="provider"
                    label="Fornecedor"
                    type="text"
                    list="providers"
                    options={this.state.providers}
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
