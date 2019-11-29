import React from 'react';
import './styles.css';

export default function Login({ history }) {
    return (
        <div>
            Login
            <button onClick={() => history.push('/lista')}>botão</button>
        </div>
    )
}
