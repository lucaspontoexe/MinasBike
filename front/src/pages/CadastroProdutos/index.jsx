import React, { Component } from 'react';
import api from '../../services/api';
import TextBox from '../../components/TextBox';
import Button from '../../components/Button';
import './styles.css';

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
            id_category: 0,
            id_provider: 0,
        };
    }

    // response data
    categoryData = [];
    providersData = [];

    handleChange = ({ target }) => {
        const isNumber = target.type === 'number';

        this.setState({
            [target.name]: isNumber ? parseFloat(target.value) : target.value,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        console.log('posting: ', this.state);
        const response = await api.post('/products', this.state, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log(response);
        this.props.history.replace('/lista');
    };

    getID(array, name) {
        const matches = array.filter(obj => obj.name === name);
        if (matches.length === 0) return undefined;
        return matches[0].id;
    }

    componentDidMount() {
        // TODO: maybe use async/await?
        api.get('/providers').then(response => {
            this.providersData = response.data;
        });

        api.get('/categories').then(response => {
            this.categoryData = response.data;
        });
    }

    render() {
        return (
            <div className="tela cadastro-produtos">
                <form onSubmit={this.handleSubmit}>
                    <div className="page">
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
                            options={this.categoryData.map(obj => obj.name)}
                            onChange={event =>
                                this.setState({
                                    id_category: this.getID(
                                        this.categoryData,
                                        event.target.value
                                    ),
                                })
                            }
                        />
                        <TextBox
                            name="provider"
                            label="Fornecedor"
                            type="text"
                            list="providers"
                            options={this.providersData.map(obj => obj.name)}
                            onChange={event =>
                                this.setState({
                                    id_provider: this.getID(
                                        this.providersData,
                                        event.target.value
                                    ),
                                })
                            }
                        />
                        <TextBox
                            name="code"
                            type="number"
                            label="Código de Barras"
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="page">
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

                        <div className="item">
                            <Button color="#DC2438">Cancelar</Button>
                            <Button type="submit" color="#8EE88C">
                                Cadastrar
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
