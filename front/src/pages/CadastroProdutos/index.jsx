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

        try {
            const response = await api.post('/products', this.state, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response);
            this.props.history.replace('/produtos');
        } catch (error) {
            console.log(error.response.data);
        }
    };

    getID(array, name) {
        const matches = array.filter(obj => obj.name === name);
        if (matches.length === 0) return undefined;
        return matches[0].id;
    }

    componentDidMount() {
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
                            required
                            label="Nome do Produto"
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                        />
                        <TextBox
                            required
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
                            required
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
                            required
                            name="code"
                            type="number"
                            label="Código de Barras"
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="page">
                        <TextBox
                            required
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
                                required
                                name="quantity_per_unity"
                                label="Quantidade por item"
                                type="number"
                                min={1}
                                max={999}
                                onChange={this.handleChange}
                            />
                            <TextBox
                                required
                                name="unity"
                                label="Unidade de medida"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </div>
                        <TextBox
                            required
                            name="price"
                            label="Preço"
                            type="number"
                            step="0.01"
                            min="0.05"
                            onChange={event =>
                                this.setState({
                                    price: event.target.value * 100,
                                })
                            }
                        />

                        <div className="item">
                            <Button
                                color="#DC2438"
                                onClick={() =>
                                    this.props.history.replace('/produtos')
                                }
                            >
                                Cancelar
                            </Button>
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
