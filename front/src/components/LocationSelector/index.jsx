import React, { useState, useEffect } from 'react';

import api from 'services/api';
import useAuth from 'utils/useAuth';
import stateNames from './states.json';

import SelectWithLabel from 'components/SelectWithLabel';

export default function LocationSelector({ onChange }) {
    const [currentBRState, setCurrentBRState] = useState('');
    const [currentCity, setCurrentCity] = useState({});
    const [cityList, setCityList] = useState([]);

    const br_states = stateNames.map(item => {
        return { value: item, label: item };
    });

    useEffect(() => {
        setCurrentCity({});
        api.get('/locations', {
            ...useAuth,
            params: { state: currentBRState },
        }).then(res =>
            setCityList(
                res.data.map(item => {
                    return { value: item.id, label: item.city };
                })
            )
        );
    }, [currentBRState]);

    return (
        <>
            <SelectWithLabel
                name="location_state"
                label="Estado"
                required
                options={br_states}
                onChange={opt => setCurrentBRState(opt.value)}
            />
            <SelectWithLabel
                name="location_city"
                label="Cidade"
                required
                isDisabled={currentBRState === ''}
                options={cityList}
                value={currentCity}
                onChange={opt => {
                    setCurrentCity(opt);
                    onChange(opt.value);
                }}
            />
        </>
    );
}
