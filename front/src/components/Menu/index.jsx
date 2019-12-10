import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles.css';

import logo from '../../assets/images/logo.png';

function Menu(props) {
    const { pathname } = props.history.location;

    const listItems = [
        { name: 'Produtos', path: '/produtos' /*, icon: produto*/ },
        { name: 'Fornecedores', path: '/fornecedores' },
        { name: 'Estoque', path: '/estoque' },
        { name: 'Vendas', path: '/vendas' },
    ];

    return (
        <>
            {pathname !== '/' && (
                <div className="main-menu">
                    <div className="logo">
                        <img src={logo} alt="Minas Bike Logo" />
                    </div>

                    <nav>
                        <ul>
                            {listItems.map(item => (
                                <li
                                    className={
                                        pathname.includes(item.path)
                                            ? 'selected'
                                            : undefined
                                    }
                                >
                                    {/* <img src={item.icon} alt={item.name}> */}
                                    <Link to={item.path}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </>
    );
}
export default withRouter(Menu);
