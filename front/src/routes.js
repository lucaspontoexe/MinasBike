import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ListaProdutos from './pages/ListaProdutos';
import Login from './pages/Login';
import CadastroProdutos from './pages/CadastroProdutos';
import NovaConta from './pages/NovaConta';
import Menu from './components/Menu';

export default function Routes() {
    return (
        <BrowserRouter>
            <Menu />
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/lista" component={ListaProdutos} />
                <Route path="/novo" component={CadastroProdutos} />
                <Route path="/cadastrar" component={NovaConta} />
            </Switch>
        </BrowserRouter>
    );
}
