import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ListaProdutos from './pages/ListaProdutos';
import Login from './pages/Login';
import CadastroProdutos from './pages/CadastroProdutos';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/lista" component={ListaProdutos} />
                <Route path="/novo" component={CadastroProdutos} />
            </Switch>
        </BrowserRouter>
    );
}
