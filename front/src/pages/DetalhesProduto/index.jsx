import React, {useState, useEffect} from 'react';
import TextBox from '../../components/TextBox';
import Button from '../../components/Button';
import Header from '../../components/Header';
import api from '../../services/api';
import './styles.css';

export default function DetalhesProduto(props) {
    const { id } = props.match.params;
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [productData, setProductData] = useState({});
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await api.get('/products');
        setProducts(response.data)
        setProductData(products.filter(item => item.id === id)[0])
        setIsLoaded(true);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(event);
    }

    return (
        <div className="tela detalhes-produto">
            <Header>Detalhes do Produto {id}</Header>

            {isLoaded && <form onSubmit={handleSubmit}>
                <div className="column">
                    <TextBox name="price" label="Preço" type="number" disabled value={productData.price}/>
                    {/* <TextBox name="preco_custo" label="Preço de custo" type="number"/> */}
                    {/* <TextBox name="preco_venda" label="Preço de venda" type="number"/> */}
                    <TextBox name="name" label="Nome do Produto" disabled value={productData.name}/>
                    <TextBox name="provider" label="Fornecedor" disabled value={productData.id_provider}/>
                </div>

                <div className="column">
                    <TextBox name="category" label="Categoria" disabled value={productData.id_category}/>
                    {/* <TextBox name="sold" label="Quantidade Vendida" /> */}
                    <TextBox name="code" label="Código de Barras" type="number" disabled value={productData.code}/>
                </div>
            </form>

            }{/* <div className="buttons">
                <Button
                    color="#DC2438"
                    onClick={() => this.props.history.replace('/produtos')}
                >
                    Cancelar
                </Button>
                <Button type="submit" color="#30CC57">
                    Salvar
                </Button>
            </div> */}
        </div>
    );
}
