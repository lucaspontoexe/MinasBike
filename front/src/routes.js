import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/LandingPage/Login';
import NovaConta from './pages/LandingPage/Registro';
import Menu from './components/Menu';
import ListaProdutos from './pages/Lista/Produtos';
import ListaEstoque from './pages/Lista/Estoque';
import ListaFornecedores from 'pages/Lista/Fornecedores';
import CadastroProdutos from './pages/CadastroProdutos';
import CadastroFornecedor from 'pages/Cadastro/Fornecedor';
import DetalhesProduto from './pages/DetalhesProduto';
import AuthCheck from './AuthCheck';

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

                <Route path="/fornecedores" exact component={ListaFornecedores} />
                <Route path="/fornecedores/novo" component={CadastroFornecedor} />

                <Route path="/estoque" exact component={ListaEstoque} />
                <Route path="/cadastrar" component={NovaConta} />
            </Switch>
        </BrowserRouter>
    );
}
