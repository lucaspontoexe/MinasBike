import React from 'react';
import Button from '../../components/Button';
import './styles.css';

export default function ListaProdutos({ history }) {
    const teste = [
        {
            heading_1: 'Teste 1',
            heading_2: 'Isso vai ser gerado por código',
            heading_3: 'object.keys neles',
        },
        {
            heading_1: 'Teste 2',
            heading_2: 'Isso tá sendo gerado por código',
            heading_3: 'object.entries neles',
        },
        {
            heading_1: 'Teste 3',
            heading_2: 'Isso foi gerado por código',
            heading_3: 'último item',
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
                            {Object.keys(teste[0]).map(key => (
                                <th>{key}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {teste.map(row => (
                            <tr>
                                {Object.entries(row).map(entry => (
                                    <td>{entry[1]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
