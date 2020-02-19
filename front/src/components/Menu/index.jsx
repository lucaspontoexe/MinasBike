import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles.css';

import logo from 'assets/images/logo.png';

import produto from 'assets/icons/produto.svg';
import fornecedor from 'assets/icons/fornecedor.svg';
import estoque from 'assets/icons/estoque.svg';
import vendas from 'assets/icons/payment.svg';

function Menu(props) {
  const { pathname } = props.history.location;

  const listItems = [
    { name: 'Produtos', path: '/produtos', icon: produto },
    { name: 'Fornecedores', path: '/fornecedores', icon: fornecedor },
    { name: 'Estoque', path: '/estoque', icon: estoque },
    { name: 'Vendas', path: '/vendas', icon: vendas },
  ];

  const hiddenMenuPages = ['/', '/cadastrar'];

  // TODO: mover para outro componente,
  // manter a separation of concerns funcionando
  function handleLogout() {
    sessionStorage.clear();
    props.history.push('/');
  }

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
          <button onClick={handleLogout}>Sair</button>
        </div>
      )}
    </>
  );
}
export default withRouter(Menu);
