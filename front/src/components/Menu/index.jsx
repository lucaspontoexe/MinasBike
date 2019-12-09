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
                            <li>
                                <Link to="/lista">Produtos</Link>
                            </li>
                            <li>
                                <Link to="/novo">Fornecedores</Link>
                            </li>
                            <li>
                                <a href="#">Estoque</a>
                            </li>
                            <li>
                                <a href="#">Vendas</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </>
    );
}
export default withRouter(Menu);
