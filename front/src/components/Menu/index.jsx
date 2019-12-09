import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

export default function Menu() {
    // console.log(history.location)

    return (
        <div className="main-menu">
            <nav>
                <ul>
                    <li>
                        <Link to="/lista">Lista</Link>
                    </li>
                    <li>
                        <Link to="/novo">Outro Link</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
