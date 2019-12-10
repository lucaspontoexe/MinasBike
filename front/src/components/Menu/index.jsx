import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles.css';

import logo from '../../assets/images/logo.png';

function Menu(props) {
    const { pathname } = props.history.location;

    return (
        <>
            {pathname !== '/' && (
                <div className="main-menu">
                    <div className="logo">
                        <img src={logo} alt="Minas Bike Logo" />
                    </div>

                    <nav>
                        <ul>
                            <li className={pathname === '/lista' && 'selected'}>
                                <Link to="/lista">Produtos</Link>
                            </li>
                            <li className={pathname === '/novo' && 'selected'}>
                                <Link to="/novo">Fornecedores</Link>
                            </li>
                            <li className={pathname === '/estoque' && 'selected'}>
                                <Link to="/lista">Estoque</Link>
                            </li>
                            <li className={pathname === '/vendas' && 'selected'}>
                                <Link to="/lista">Vendas</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </>
    );
}
export default withRouter(Menu);
