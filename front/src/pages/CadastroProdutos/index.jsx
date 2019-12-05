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
            price: undefined,
            code: undefined,
            quantity_per_unity: undefined,
            unity: '',
            categories: [],
            providers: [],
            id_category: 0,
            id_provider: 0,
        };
    }

    // ID tables
    categoryData = {};
    providersData = {};

    handleChange = ({ target }) => {
        const isNumber = target.type === 'number';

        this.setState({
            [target.name]: isNumber ? parseFloat(target.value) : target.value,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        const submitObject = {
            ...this.state,
            categories: undefined,
            providers: undefined,
        };

        console.log('posting: ', submitObject);
        const response = await api.post('/products', submitObject, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log(response);
        this.props.history.replace('/lista');
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
            <form className="cadastro-produtos" onSubmit={this.handleSubmit}>
                Tela de Cadastro
                <TextBox
                    label="Nome do Produto"
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                />
                <TextBox
                    name="category"
                    label="Categoria"
                    type="text"
                    list="categorias"
                    options={this.state.categories}
                    onChange={event =>
                        this.setState({
                            id_category: this.categoryData[event.target.value],
                        })
                    }
                />
                <TextBox
                    name="provider"
                    label="Fornecedor"
                    type="text"
                    list="providers"
                    options={this.state.providers}
                    onChange={event =>
                        this.setState({
                            id_provider: this.providersData[event.target.value],
                        })
                    }
                />
                <TextBox
                    name="code"
                    type="number"
                    label="Código de Barras"
                    onChange={this.handleChange}
                />
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
                    onChange={this.handleChange}
                />
                <div className="item">
                    <TextBox
                        name="quantity_per_unity"
                        label="Quantidade por item"
                        type="number"
                        onChange={this.handleChange}
                    />
                    <TextBox
                        name="unity"
                        label="Unidade de medida"
                        type="text"
                        onChange={this.handleChange}
                    />
                </div>
                <TextBox
                    name="price"
                    label="Preço"
                    type="number"
                    step="0.01"
                    onChange={this.handleChange}
                />
                <div className="infos">informações adicionais</div>
                <Button type="submit" color="#8EE88C">
                    Cadastrar
                </Button>
            </form>
        );
    }
}
