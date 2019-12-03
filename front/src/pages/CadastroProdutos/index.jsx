import React, { Component } from 'react';
import api from '../../services/api';
import TextBox from '../../components/TextBox';
import Button from '../../components/Button';

export default class CadastroProdutos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name: '',
                brand: '',
                price: null,
                code: null,
                quantity_per_unity: null,
                unity: 'unid.',
                id_category: 1,
                id_provider: 2,
            },
            categoryData: {},
            providersData: {},
        };
    }

    handleChange = ({ target }) => {
        const isNumber = target.type === 'number';

        // if is an ID field, change according state and return

        this.setState({
            formData: {
                [target.name]: isNumber
                    ? parseFloat(target.value)
                    : target.value,
            },
        });
        console.log(this.state);
    };

    testChangeArray() {
        const algo = [
            {
                id: 1,
                name: 'nomeDoFornecedor',
                contact_name: 'nomeDoContato',
                phone: 1231231232,
                price: 4999,
                createdAt: '2019-12-02T22:35:41.916Z',
                updatedAt: '2019-12-02T22:35:41.916Z',
                id_location: 1,
            },
            {
                id: 2,
                name: "Fulano's Peças",
                contact_name: 'Fulano',
                phone: 40028922,
                price: 5000,
                createdAt: '2019-12-02T22:36:24.481Z',
                updatedAt: '2019-12-02T22:36:24.481Z',
                id_location: 2,
            },
        ];

        let algo2 = []

        for (let entry of algo) {
            algo2.push({[entry.name]: entry.id})
        }
        console.log(algo2)
    }

    componentDidMount() {
        api.get('/products').then(response => console.log(response.data));

        api.get('/providers').then(response =>
            this.setState({ providersData: response.data })
        );
        this.testChangeArray();
    }

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
            </div>
        );
    }
}
