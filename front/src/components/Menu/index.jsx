import React from 'react';
import { Link } from "react-router-dom";
import './styles.css';

export default function Menu() {

    // console.log(history.location)

    return (
        <div className="main-menu">
            <nav>
                <Link to="/lista">Lista</Link>
            </nav>
        </div>
    );
}