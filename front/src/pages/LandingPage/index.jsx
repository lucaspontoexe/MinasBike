import React from 'react'

export default function LandingPage({ history }) {
    return (
        <div className="login-screen">
            {history.location.pathname === '/cadastrar' ? 'Login' : 'Criar Conta'}
        </div>
    )
}
