import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ListaProdutos from './pages/ListaProdutos';
import ListaEstoque from './pages/ListaEstoque';
import Login from './pages/Login';
import CadastroProdutos from './pages/CadastroProdutos';
import NovaConta from './pages/NovaConta';
import Menu from './components/Menu';
import DetalhesProduto from './pages/DetalhesProduto';
import AuthCheck from 'AuthCheck';

export default function Routes() {
    return (
        <BrowserRouter>
            <Menu />
            <AuthCheck />
            <Switch>
                <Route path="/" exact component={Login} />

                <Route path="/produtos" exact component={ListaProdutos} />
                <Route path="/produtos/novo" component={CadastroProdutos} />
                <Route path="/produtos/:code" component={DetalhesProduto} />

                <Route path="/estoque" exact component={ListaEstoque} />
                <Route path="/cadastrar" component={NovaConta} />
            </Switch>
        </BrowserRouter>
    );
}
