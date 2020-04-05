import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

import './styles.css';

import logo from 'assets/images/logo.png';

import produto from 'assets/icons/produto.svg';
import fornecedor from 'assets/icons/fornecedor.svg';
import estoque from 'assets/icons/estoque.svg';
import vendas from 'assets/icons/payment.svg';
import user from 'assets/icons/user.svg';

function Menu(props) {
  const { pathname } = props.history.location;
  const { logout } = useAuth();

  const listItems = [
    { name: 'Produtos', path: '/produtos', icon: produto },
    { name: 'Fornecedores', path: '/fornecedores', icon: fornecedor },
    { name: 'Estoque', path: '/estoque', icon: estoque },
    { name: 'Vendas', path: '/vendas', icon: vendas },
    { name: 'Usuários', path: '/usuarios', icon: user },
    { name: 'Clientes', path: '/clientes', icon: user },
  ];

  const hiddenMenuPages = ['/', '/cadastrar'];

  return (
    <>
      {!hiddenMenuPages.includes(pathname) && (
        <div className="main-menu">
          <div className="logo">
            <img src={logo} alt="Minas Bike Logo" />
          </div>

          <nav>
            <ul>
              {listItems.map(item => (
                <li
                  key={item.name}
                  className={pathname.includes(item.path) ? 'selected' : undefined}
                >
                  <img src={item.icon} alt={item.name} />
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <button onClick={logout}>Sair</button>
        </div>
      )}
    </>
  );
}
export default withRouter(Menu);
