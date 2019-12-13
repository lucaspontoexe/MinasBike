import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';

export default function Select(props) {
    const { name, options, label } = props;
    const [loadedOptions, setLoadedOptions] = useState([]);
    const grabfromAPI = typeof options === 'string';

    useEffect(() => {
        api.get(options).then(response => setLoadedOptions(response.data));
    }, [options]);

    return (
        <div className="select-wrapper">
            {/* renderiza label se existir */}
            {label && <label htmlFor={name}>{label}</label>}
            <select {...props}>
                {/* 🐎🐎🐎🐎🐎🐎🐎 */}
                {grabfromAPI
                    ? loadedOptions.map(item => (
                          <option key={item.id} value={item.id}>
                              {item.name}
                          </option>
                      ))
                    : options.map(item => (
                          <option key={item.id} value={item.id}>
                              {item.name}
                          </option>
                      ))}
            </select>
        </div>
    );
}
