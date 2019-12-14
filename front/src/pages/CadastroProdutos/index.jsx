import React, { Component } from 'react';
import api from '../../services/api';
import TextBox from '../../components/TextBox';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Error from '../../components/Error';
import SelectWithLabel from '../../components/SelectWithLabel';

import './styles.css';

export default class CadastroProdutos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            brand: '',
            price: 5,
            code: undefined,
            quantity_per_unity: undefined,
            unity: '',
            id_category: 1,
            id_provider: 1,
            qty_in_stock: 1,
            error: '',
            categories: [],
            providers: [],
        };
    }

    handleChange = ({ target }) => {
        const isNumber = target.type === 'number';

        this.setState({
            [target.name]: isNumber ? parseFloat(target.value) : target.value,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        //TODO: state independente
        const submitObject = {
            ...this.state,
            providers: undefined,
            categories: undefined,
            id_provider: this.state.id_provider.value,
            id_category: this.state.id_category.value,
            error: undefined,
        };
        
        console.log('posting: ', submitObject);

        try {
            const response = await api.post('/products', submitObject, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response);
            this.props.history.replace('/produtos');
        } catch (error) {
            this.setState({ error: error.response.data });
            console.log(error.response.data);
        }
    };

    componentDidMount() {
        api.get('/providers').then(response => {
            this.setState({ providers: response.data });
        });
        api.get('/categories').then(response => {
            this.setState({ categories: response.data });
        });
    }
    render() {
        return (
            <div className="tela cadastro-produtos">
                {this.state.error !== '' && <Error>{this.state.error}</Error>}
                <Header>Novo Produto</Header>
                <form onSubmit={this.handleSubmit}>
                    <div className="page">
                        <TextBox
                            required
                            label="Nome do Produto"
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                        />

                        <SelectWithLabel
                            required
                            name="category"
                            label="Categoria"
                            placeholder="Escolha uma categoria..."
                            options={this.state.categories.map(item => {
                                return { value: item.id, label: item.name };
                            })}
                            value={this.state.id_category}
                            onChange={selectedOption => {
                                this.setState({ id_category: selectedOption });
                            }}
                        />

                        <SelectWithLabel
                            required
                            name="provider"
                            label="Fornecedor"
                            placeholder="Escolha um fornecedor..."
                            options={this.state.providers.map(item => {
                                return { value: item.id, label: item.name };
                            })}
                            value={this.state.id_provider}
                            onChange={selectedOption => {
                                this.setState({ id_provider: selectedOption });
                            }}
                        />

                        <TextBox
                            required
                            name="code"
                            type="number"
                            label="Código de Barras"
                            onChange={this.handleChange}
                        />
                        <TextBox
                            required
                            name="brand"
                            label="Marca"
                            type="text"
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="page">
                        <div className="item">
                            <TextBox
                                required
                                name="quantity_per_unity"
                                label="Quantidade por item"
                                title="Quantas unidades são vendidas por item"
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
                                // placeholder="unidade, kg, metros..."
                            />
                        </div>

                        <div className="item">
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
                            <TextBox
                                name="qty_current"
                                label="Quantidade atual no estoque"
                                type="number"
                                onChange={this.handleChange}
                                min="1"
                            />
                        </div>
                        <div className="item">
                            <TextBox
                                name="qty_min"
                                label="Quantidade mínima no estoque"
                                disabled
                            />
                            <TextBox
                                name="qty_max"
                                label="Quantidade máxima no estoque"
                                disabled
                            />
                        </div>

                        <div className="item">
                            <TextBox
                                name="change_by"
                                label="Alterado por"
                                disabled
                            />
                            <TextBox
                                name="incl_by"
                                label="Incluído por"
                                disabled
                            />
                        </div>

                        <div className="buttons">
                            <Button
                                color="#DC2438"
                                onClick={() =>
                                    this.props.history.replace('/produtos')
                                }
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" color="#30CC57">
                                Cadastrar
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
