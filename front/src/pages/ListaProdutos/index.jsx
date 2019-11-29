import React from 'react';

export default function ListaProdutos({ history }) {
    return (
        <div>
            uma lista de produtos aparece aqui
            <button onClick={() => history.push('/novo')}>Cadastrar produto</button>
            <button>botão 2</button>
            <div className="table">
                <tr>
                    <th>Cabeçalho A</th>
                    <th>Cabeçalho B</th>
                    <th>Heading C</th>
                </tr>
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
            </div>
        </div>
    );
}
