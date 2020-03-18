import React, { useState } from 'react';

export default function EditableRow({
  id,
  number: initialNumber,
  name_id,
  nameObjs,
  onRemove,
  onChange,
}) {
  const [data, setData] = useState({
    id,
    number: initialNumber,
    name_id,
  });

  function handleChange({ name, value }) {
    console.log(name, value);
    setData({ ...data, [name]: value });
    onChange({ ...data, [name]: value });
  }

  return (
    <tr>
      <td>
        <select name="name_id" value={name_id} onChange={e => handleChange(e.target)}>
          {nameObjs.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </td>
      
      <td>
        <input name="number" value={data.number} onChange={e => handleChange(e.target)} />
      </td>

      <td onClick={() => onRemove(id)}>[X]</td>
    </tr>
  );
}
