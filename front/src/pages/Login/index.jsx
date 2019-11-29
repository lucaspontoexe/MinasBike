import React from 'react';
import Button from '../../components/Button';

export default function Login({ history }) {
    return (
        <div>
            Login
            <Button onClick={() => history.push('/lista')}>botão</Button>
        </div>
    );
}
