import React, { useState, useEffect } from 'react';
import EditableRow from './EditableRow';
import AddRow from './AddRow';

export default function ProviderSelector({ onChange }) {
  const initialData = [
    { id: 1, number: 74226, name_id: 5 },
    { id: 2, number: 6000, name_id: 6 },
    { id: 3, number: 5994, name_id: 7 },
    { id: 4, number: 2997, name_id: 8 },
  ];

  const nameObjs = [
    { id: 5, name: 'tá ali' },
    { id: 6, name: 'tá vendo' },
    { id: 7, name: 'olha só' },
    { id: 8, name: 'ala' },
  ];

  const [data, setData] = useState(initialData);

  const removeLine = id => setData(old => old.filter(item => item.id !== id));
  const handleCreate = obj => setData(old => [...old, obj]);
  const handleChange = obj => setData(old => old.map(item => (item.id === obj.id ? obj : item)));

  useEffect(() => {
    onChange(data);
  }, [data, onChange]);

  return (
    <div>
      <table>
        <tbody>
          {data.map(item => (
            <EditableRow
              {...item}
              nameObjs={nameObjs}
              key={item.id}
              onRemove={removeLine}
              onChange={handleChange}
            />
          ))}
        </tbody>
      </table>

      <AddRow nameObjs={nameObjs} onCreate={obj => handleCreate(obj)} />
    </div>
  );
}
