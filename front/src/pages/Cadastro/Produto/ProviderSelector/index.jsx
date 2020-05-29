import React, { useState, useEffect } from 'react';
import api from 'services/api';
import isArrayUnique from 'utils/isArrayUnique';
import EditableRow from './EditableRow';
import AddRow from './AddRow';
import Row from './Row';
import './styles.scss';

export default function ProviderSelector({ brandproduct_id, onChange, useRuleTwo = true }) {
  const [providers, setProviders] = useState([]);
  const [prpr, setPrpr] = useState([]);

  const [newitems, setNewitems] = useState([]);

  // rule two = regra especial 2 do trello.

  useEffect(() => {
    api.get('/providers').then(response => setProviders(response.data));
  }, []);

  useEffect(() => {
    function getCurrentPRPR() {
      api
        .get('/providerproducts', { params: { provider: true, brandproduct_id } })
        .then(response => (useRuleTwo ? setPrpr(response.data) : setNewitems(response.data)));
    }
    getCurrentPRPR();
  }, [brandproduct_id, useRuleTwo]);

  useEffect(() => {
    onChange({ items: newitems, isValid: checkIfValid(), teste: 'umdois' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newitems]);

  const checkIfValid = () => {
    const prprIDList = prpr.map(item => item.provider_id);
    const newitemsIDList = newitems.map(item => Number(item.provider_id));
    const temp = prprIDList.concat(newitemsIDList);
    return isArrayUnique(temp);
  };

  const removeLine = id => setNewitems(old => old.filter(item => item.id !== id));
  const handleCreate = obj => setNewitems(old => [...old, obj]);
  const handleChange = obj =>
    setNewitems(old => old.map(item => (item.id === obj.id ? obj : item)));

  return (
    <div className="prpr-selector">
      <div className="pseudo-label">Fornecedores</div>
      <table className="prpr-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço de Custo</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {newitems.length === 0 && prpr.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center ', height: 96 }}>
                Nenhum item
              </td>
            </tr>
          )}

          {prpr.map(item => (
            <Row
              {...item}
              providers={providers}
              key={`provider_${item.id}`}
              displayExtraCell
            />
          ))}

          {newitems.map(item => (
            <EditableRow
              {...item}
              providers={providers}
              key={item.id}
              onRemove={removeLine}
              onChange={handleChange}
            />
          ))}
        </tbody>
        <AddRow providers={providers} onCreate={obj => handleCreate(obj)} />
      </table>
    </div>
  );
}
