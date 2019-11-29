import React from 'react';
import Button from '../../components/Button';

export default function ListaProdutos({ history }) {
    return (
        <div>
            uma lista de produtos aparece aqui
            <Button color="#aabb00" onClick={() => history.push('/novo')}>
                Cadastrar produto
            </Button>
            <Button onDoubleClick={() => alert('eh')}>botão 2</Button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Cabeçalho A</th>
                        <th>Cabeçalho B</th>
                        <th>Heading C</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Teste 1</td>
                        <td>Isso vai ser gerado por código</td>
                        <td>object.keys possivelmente</td>
                    </tr>
                    <tr>
                        <td>Teste 2</td>
                        <td>Isso vai ser gerado por código</td>
                        <td>map() neles</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
