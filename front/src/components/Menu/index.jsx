import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles.scss';

function Menu(props) {
    const { pathname } = props.history.location;

    return (
        <>
            {pathname !== '/' && (
                <div className="main-menu">
                    <nav>
                        <ul>
                            <li className="selected">
                                <Link to="/lista">Produtos</Link>
                            </li>
                            <li>
                                <Link to="/novo">Fornecedores</Link>
                            </li>
                            <li>
                                <Link to="/lista">Estoque</Link>
                            </li>
                            <li>
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
