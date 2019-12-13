import React from 'react';
import TextBox from '../../components/TextBox';
import Header from '../../components/Header';
import './styles.css';

export default function DetalhesProduto(props) {
    const { id } = props.match.params;
    return (
        <div className="tela detalhes-produto">
            <Header>Detalhes do Produto {id}</Header>

            <form action="">
                <div className="column">
                    <TextBox name="preco_custo" label="Preço de custo" />
                    <TextBox name="preco_venda" label="Preço de venda" />
                    <TextBox name="name" label="Nome do Produto" />
                    <TextBox name="provider" label="Fornecedor" />
                </div>

                <div className="column">
                    <TextBox name="category" label="Categoria" />
                    <TextBox name="sold" label="Quantidade Vendida" />
                    <TextBox name="code" label="Código de Barras" />
                </div>
            </form>
        </div>
    );
}
