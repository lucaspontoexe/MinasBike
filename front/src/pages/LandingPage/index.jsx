import React from 'react'
import Login from './Login'
import Registro from './Registro'

export default function LandingPage({ history }) {
    return (
        <div className="login-screen">
            {history.location.pathname === '/cadastrar' ? <Registro/> : <Login/>}
        </div>
    )
}
