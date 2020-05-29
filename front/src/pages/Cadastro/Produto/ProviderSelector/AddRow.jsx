import React, { useState, useEffect } from 'react';
import shortid from 'shortid';
import TextBox from 'components/TextBox';

export default function AddRow(props) {
  const [provider_id, setProviderID] = useState(-1);
  const [cost_price, setCostPrice] = useState(5);

  useEffect(() => {
    setProviderID(props.providers[0]?.id);
  }, [props.providers]);

  return (
    <tfoot>
      <tr>
        <td>
          <select name="provider_id" onChange={e => setProviderID(e.target.value)}>
            {props.providers.map(item => (
              <option key={`addrow_pr_${item.id}`} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </td>

        <td>
          <TextBox
            type="currency"
            name="cost_price"
            placeholder="Insira o preço de custo"
            onChange={setCostPrice}
          />
        </td>
        <td>
          <button
            className="add"
            type="button"
            onClick={() =>
              props.onCreate({
                cost_price,
                id: shortid.generate(),
                provider_id,
              })
            }
          >
            Adicionar
          </button>
        </td>
      </tr>
    </tfoot>
  );
}
