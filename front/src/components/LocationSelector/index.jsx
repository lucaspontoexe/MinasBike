import React, { useState, useEffect } from 'react';
import api from 'services/api';
import devlog from 'utils/devlog';
import stateNames from './states.json';
import SelectWithLabel from 'components/SelectWithLabel';

export default function LocationSelector(props) {
  const [currentBRState, setCurrentBRState] = useState('');
  const [currentCity, setCurrentCity] = useState(props.initialValue || { value: '', label: '' });
  const [cityList, setCityList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const br_states = stateNames.map(item => {
    return { value: item, label: item };
  });

  useEffect(() => {
    // tip: destructuring breaks reactivity
    if (props.initialValue) {
      setCurrentBRState(props.initialValue.state);
      
      // dirty problems require dirty solutions
      setTimeout(() => {
        setCurrentCity({ value: props.initialValue.id, label: props.initialValue.city });
      }, 400);
    }
  }, [props.initialValue]);

  useEffect(() => {
    setIsLoading(true);
    setCurrentCity({});

    api
      .get('/locations', {
        params: { state: currentBRState },
      })
      .then(res =>
        setCityList(
          res.data.map(item => {
            return { value: item.id, label: item.city };
          })
        )
      )
      .finally(setIsLoading(false));
  }, [currentBRState]);

  useEffect(() => {
    devlog(currentCity);
  }, [currentCity]);

  return (
    <>
      <SelectWithLabel
        name="location_state"
        label="Estado"
        required={props.required}
        isDisabled={props.disabled}
        options={br_states}
        value={{ value: currentBRState, label: currentBRState }}
        onChange={opt => setCurrentBRState(opt.value)}
      />
      <SelectWithLabel
        name="location_city"
        label="Cidade"
        required={props.required}
        isDisabled={currentBRState === '' || props.disabled}
        isLoading={isLoading}
        options={cityList}
        value={currentCity}
        onChange={opt => {
          setCurrentCity(opt);
          props.onChange(opt.value);
        }}
      />
    </>
  );
}
