import React, { useState } from 'react';
import shortid from 'shortid';

export default function AddRow(props) {
  const [provider_id, setProviderID] = useState(-1);
  const [cost_price, setCostPrice] = useState('');

  return (
    <div>
      <div>
        <select name="provider_id" onChange={e => setProviderID(e.target.value)}>
          {props.providers.map(item => (
            <option key={`addrow_pr_${item.id}`} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <input name="cost_price" placeholder="48022" onChange={e => setCostPrice(e.target.value)} />
      </div>

      <button type="button"
        onClick={() =>
          props.onCreate({
            cost_price,
            id: shortid.generate(),
            provider_id,
          })
        }
      >
        add
      </button>
    </div>
  );
}
