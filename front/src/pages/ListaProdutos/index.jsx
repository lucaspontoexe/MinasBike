import React from 'react';
import Button from '../../components/Button';
import './styles.css';

export default function ListaProdutos({ history }) {
    const teste = [
        {
            header_1: 'Teste 1',
            header_2: 'Isso vai ser gerado por código',
            header_3: 'object.keys neles',
            header_4: 'chaves',
            header_5: 'chaves',
            header_6: 'valores',
            header_7: 'todos atentos',
        },
        {
            header_1: 'Teste 2',
            header_2: 'Isso tá sendo gerado por código',
            header_3: 'object.entries neles',
            header_4: 'chaves',
            header_5: 'chaves',
            header_6: 'valores',
            header_7: 'todos atentos',
        },
        {
            header_1: 'Teste 3',
            header_2: 'Isso foi gerado por código',
            header_3: 'último item',
            header_4: 'keys',
            header_5: 'keys',
            header_6: 'values',
            header_7: 'everybody paying attention',
        },
    ];

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
                        {teste.map((row, index) => (
                            <tr key={index}>
                                {Object.entries(row).map((entry, index) => (
                                    <td key={index}>{entry[1]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
