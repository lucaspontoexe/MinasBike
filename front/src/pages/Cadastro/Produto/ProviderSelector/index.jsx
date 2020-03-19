import React, { useState, useEffect } from 'react';
import api from 'services/api';
import EditableRow from './EditableRow';
import AddRow from './AddRow';
import Row from './Row';

export default function ProviderSelector({ brandproduct_id, onChange }) {
  const [providers, setProviders] = useState([]);
  const [prpr, setPrpr] = useState([]);

  const [newitems, setNewitems] = useState([]);

  useEffect(() => {
    api.get('/providers').then(response => setProviders(response.data));
  }, []);

  useEffect(() => {
    function getCurrentPRPR() {
      api
        .get('/providerproducts', { params: { provider: true, brandproduct_id } })
        .then(response => setPrpr(response.data));
    }
    getCurrentPRPR();
  }, [brandproduct_id]);

  useEffect(() => {
    onChange(newitems);
  }, [newitems, onChange]);

  const removeLine = id => setNewitems(old => old.filter(item => item.id !== id));
  const handleCreate = obj => setNewitems(old => [...old, obj]);
  const handleChange = obj =>
    setNewitems(old => old.map(item => (item.id === obj.id ? obj : item)));

  return (
    <div>
      <table>
        <tbody>
          {prpr.map(item => (
            <Row {...item} providers={providers} key={`provider_${item.id}`} />
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

      <AddRow providers={providers} onCreate={obj => handleCreate(obj)} />
    </div>
  );
}
