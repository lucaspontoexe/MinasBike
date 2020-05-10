import React, { useState } from 'react';
import api from 'services/api';
import { formatErrorsSingleObject } from 'utils/formatFieldErrors';

import Header from 'components/Header';
import TextBox from 'components/TextBox';
import Button from 'components/Button';


export default function EditarProduto(props) {
  const { id } = props.match.params;
  const [canEdit, setCanEdit] = useState(false);
  
  return (
    <div className="tela tela-cadastro">
      <Header>Editar Produto</Header>

      <Button color="#dc2438" onClick={() => setCanEdit(true)}>
        Editar
      </Button>

      <form action="#">

        {/* product stuff */}
        <br/> nome
        <br/> categoria

        {/* brand */}
        <br/> marca


        {/* brandproduct */}
        <br/> código de barras
        <br/> preço de custo

        {/* stock */}
        <br/> quantidade atual de estoque

        {/* provider */}
        <br/> import provider selector


      </form>
      canedit: {JSON.stringify(canEdit)}
    </div>
  );
}
