import React, { useState, useEffect } from 'react';
import api from 'services/api';
import EditableRow from './EditableRow';
import AddRow from './AddRow';
import Row from './Row';

export default function ProviderSelector({ brandproduct_id, onChange }) {
  const mockpr = [
    { id: 1, cost_price: 74226, provider_id: 5 },
    { id: 2, cost_price: 6000, provider_id: 6 },
    { id: 3, cost_price: 5994, provider_id: 7 },
    { id: 4, cost_price: 2997, provider_id: 8 },
  ];

  const nameObjs = [
    { id: 5, name: 'tá ali' },
    { id: 6, name: 'tá vendo' },
    { id: 7, name: 'olha só' },
    { id: 8, name: 'ala' },
  ];

  const [providers, setProviders] = useState([]);
  const [prpr, setPrpr] = useState([]);

  const [newitems, setNewitems] = useState([]);

  useEffect(() => {
    function fetchData() {
      api.get('/providerproducts', {params: {provider: true, brandproduct_id}}).then(response => {
        setProviders(response.data.map(item => item.provider));
        setPrpr(response.data);
      });
    }
    fetchData();
  }, [brandproduct_id]);

  useEffect(() => {
    onChange(prpr);
  }, [prpr, onChange]);

  const removeLine = id => setNewitems(old => old.filter(item => item.id !== id));
  const handleCreate = obj => setNewitems(old => [...old, obj]);
  const handleChange = obj =>
    setNewitems(old => old.map(item => (item.id === obj.id ? obj : item)));

  return (
    <div>
      <table>
        <tbody>
          {prpr.map(item => (
            <Row {...item} providers={providers} key={`provider_${item.id}`}/>
          ))}

          {newitems.map(item => (
            <EditableRow
              {...item}
              providers={providers}
              key={Math.random() * -1}
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
