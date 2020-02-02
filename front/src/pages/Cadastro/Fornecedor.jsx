import React, { useState, useEffect } from 'react';

import api from 'services/api';
import useAuth from 'utils/useAuth';
import stateNames from './states.json';

import Header from 'components/Header';
import TextBox from 'components/TextBox';
import SelectWithLabel from 'components/SelectWithLabel';
import Button from 'components/Button';

export default function CadastroFornecedor({ history }) {
    //TODO: Procurar se alguma lib de form ajuda
    const [formData, setFormData] = useState({});
    const [currentBRState, setCurrentBRState] = useState('');
    const [currentCity, setCurrentCity] = useState({});
    const [cityList, setCityList] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();
        api.post('/providers', useAuth, formData);
    }

    useEffect(() => {
        setCurrentCity({})
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

    function handleChange({ target }) {
        setFormData({ ...formData, [target.name]: target.value });
    }

    const br_states = stateNames.map(item => {
        return { value: item, label: item };
    });

    return (
        <div className="tela tela-cadastro">
            <Header>Novo Fornecedor</Header>

            <form onSubmit={handleSubmit}>
                <TextBox
                    name="name"
                    label="Nome do Fornecedor"
                    required
                    onChange={handleChange}
                />
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
                        setFormData({ ...formData, location_id: opt.value });
                    }}
                />
                <TextBox
                    name="contact"
                    label="Nome do Contato Principal"
                    required
                    onChange={handleChange}
                />
                <TextBox
                    name="phone"
                    label="Telefone do contato"
                    type="tel"
                    required
                    onChange={handleChange}
                />
                <TextBox
                    name="email"
                    label="E-mail do contato principal"
                    type="email"
                    required
                    onChange={handleChange}
                />
                <div className="buttons">
                    <Button
                        type="reset"
                        color="#DC2438"
                        onClick={() => history.replace('/fornecedores')}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" color="#30CC57">
                        Cadastrar
                    </Button>
                </div>
            </form>
        </div>
    );
}
