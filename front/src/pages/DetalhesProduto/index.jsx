import React from 'react'

export default function DetalhesProduto(props) {
    const {id} = props.match.params;
    return (
        <div className="tela detalhes-produto">
            detalhes do produto {id}
        </div>
    )
}
