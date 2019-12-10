import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles.css';

import logo from '../../assets/images/logo.png';

function Menu(props) {
    const { pathname } = props.history.location;

    const listItems = [
        { name: 'Produtos', path: '/lista'/*, icon: produto*/ },
        { name: 'Fornecedores', path: '/novo' },
        { name: 'Estoque', path: '/novo' },
        { name: 'Vendas', path: '/novo' },
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
                                        pathname === item.path && 'selected'
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
