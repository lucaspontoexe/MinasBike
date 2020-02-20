import React from 'react';

import './styles.css';

const Header = props => (
  <header>
    <div className="bar" />
    <span>{props.children}</span>
  </header>
);

export default Header;
