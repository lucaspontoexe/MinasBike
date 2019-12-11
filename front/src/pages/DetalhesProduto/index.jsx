import React from 'react'
import TextBox from '../../components/TextBox'

export default function DetalhesProduto(props) {
    const {id} = props.match.params;
    return (
        <div className="tela detalhes-produto">
            detalhes do produto {id}
            <TextBox name="preco_custo" label="Preço de custo"/>
            <TextBox name="preco_venda" label="Preço de venda"/>
            <TextBox name="name" label="Nome do Produto"/>
            <TextBox name="provider" label="Fornecedor"/>
            <TextBox name="category" label="Categoria"/>
            <TextBox name="sold" label="Quantidade Vendida"/>
            <TextBox name="code" label="Código de Barras"/>
        </div>
    )
}
