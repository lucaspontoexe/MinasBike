import React, { useState } from 'react';
import devlog from 'utils/devlog';
import CurrencyInput from 'components/CurrencyInput';

export default function EditableRow({
  id,
  cost_price,
  provider_id,
  providers,
  onRemove,
  onChange,
}) {
  const [data, setData] = useState({
    id,
    cost_price,
    provider_id,
  });

  function handleChange({ name, value }) {
    devlog(name, value);
    setData({ ...data, [name]: value });
    onChange({ ...data, [name]: value });
  }

  return (
    <tr>
      <td>
        <select name="provider_id" value={provider_id} onChange={e => handleChange(e.target)}>
          {providers.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </td>

      <td>
        <CurrencyInput
          className="editable-price-cell"
          name="cost_price"
          value={data.cost_price}
          onChange={value => handleChange({name: 'cost_price', value})}
        />
      </td>

      <td>
        <button className="remove" onClick={() => onRemove(id)}>
          Remover
        </button>
      </td>
    </tr>
  );
}
