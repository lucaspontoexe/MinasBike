import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles.css';

import logo from '../../assets/images/logo.png';

import produto from '../../assets/icons/produto.svg';
import fornecedor from '../../assets/icons/fornecedor.svg';
import estoque from '../../assets/icons/estoque.svg';
import vendas from '../../assets/icons/payment.svg';

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
                            <li className="selected">
                                <img src={produto} alt="produto" />
                                <Link to="/lista">Produtos</Link>
                            </li>
                            <li>
                                <img src={fornecedor} alt="fornecedor" />
                                <Link to="/novo">Fornecedores</Link>
                            </li>
                            <li>
                                <img src={estoque} alt="estoque" />
                                <Link to="/lista">Estoque</Link>
                            </li>
                            <li>
                                <img src={vendas} alt="vendas" />
                                <Link to="/lista">Vendas</Link>
                            </li>
                        </ul>
                    </nav>
                    <button onClick={console.log('logout')}>Sair</button>
                </div>
            )}
        </>
    );
}
export default withRouter(Menu);
