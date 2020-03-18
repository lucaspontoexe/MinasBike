import React, { useState } from 'react';

export default function AddRow(props) {
  const [name_id, setNameID] = useState(-1);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  return (
    <div>
      <div>
        <select name="name_id" onChange={e => setNameID(e.target.value)}>
          {props.nameObjs.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <input name="name" placeholder="joão, te ligam" onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <input name="number" placeholder="48022" onChange={e => setNumber(e.target.value)} />
      </div>
      <button
        onClick={() =>
          props.onCreate({
            name,
            number,
            id: Math.random() * -1,
            name_id,
          })
        }
      >
        add
      </button>
    </div>
  );
}
