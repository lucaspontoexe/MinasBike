import React, { useState, useEffect } from 'react';
import TextBox from 'components/TextBox';
import Button from 'components/Button';
import Header from 'components/Header';
import api from 'services/api';
import './styles.css';

export default function DetalhesProduto(props) {
  const { code } = props.match.params;

  const [isLoaded, setIsLoaded] = useState(false);
  const [productData, setProductData] = useState({});
  useEffect(() => {
    api.get('/products', { params: { code } }).then(response => {
      setProductData(response.data[0]);
      setIsLoaded(true);
    });
  }, [code]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
  }

  return (
    <div className="tela detalhes-produto">
      <Header>Detalhes do Produto {code}</Header>

      {isLoaded && (
        <form onSubmit={handleSubmit}>
          <div className="column">
            <TextBox
              name="price"
              label="Preço"
              type="number"
              disabled
              value={productData.price / 100}
            />
            {/* <TextBox name="preco_custo" label="Preço de custo" type="number"/> */}
            {/* <TextBox name="preco_venda" label="Preço de venda" type="number"/> */}
            <TextBox name="name" label="Nome do Produto" disabled value={productData.name} />
            <TextBox name="provider" label="Fornecedor" disabled value={productData.id_provider} />
          </div>

          <div className="column">
            <TextBox name="category" label="Categoria" disabled value={productData.id_category} />
            {/* <TextBox name="sold" label="Quantidade Vendida" /> */}
            <TextBox
              name="code"
              label="Código de Barras"
              type="number"
              disabled
              value={productData.code}
            />
          </div>
        </form>
      )}
      <div className="buttons">
        <Button color="#DC2438" onClick={() => props.history.replace('/produtos')}>
          Voltar
        </Button>
        {/* <Button type="submit" color="#30CC57">
                    Salvar
                </Button> */}
      </div>
    </div>
  );
}
