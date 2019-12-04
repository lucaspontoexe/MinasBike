import React, {useState, useEffect} from 'react';
import api from '../../services/api'
import Button from '../../components/Button';
import './styles.css';

export default function ListaProdutos({ history }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        mounted()
    }, [])

    async function mounted() {
        const response = await api.get('/products')
        setProducts(response.data)
        console.log('mounted');
    }

    return (
        <div>
            uma lista de produtos aparece aqui
            <Button onClick={() => history.push('/novo')}>
                Cadastrar produto
            </Button>
            <Button>Gerar Relatório</Button>
            <div className="table-wrapper">
                <header> {/* espaço para possível título */} </header>
                <table className="table">
                    <thead>
                        <tr>
                            {/* {Object.keys(teste[0]).map(key => (
                                <th>{key}</th>
                            ))} */}

                            <th>Nome</th>
                            <th>Marca</th>
                            <th>Preço</th>
                            <th>Código</th>
                            <th>Quantidade por unidade</th>
                            <th>Fornecedor</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>

                    <tbody>

                        {products.map((row, index) => (
                            // <tr key={index}>
                            //     {Object.entries(row).map((entry, index) => (
                            //         <td key={index}>{entry[1]}</td>
                            //     ))}
                            // </tr>
                            <tr key={index}>
                                <td>{row.name}</td>
                                <td>{row.brand}</td>
                                <td>{row.price}</td>
                                <td>{row.code}</td>
                                <td>{`${row.quantity_per_unity} ${row.unity}`}</td>
                                {/* todo: format IDs */}
                                <td>{row.id_provider}</td>
                                <td>{row.id_category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
