import React from 'react';
import { ProvideAuth } from 'hooks/useAuth';
import Routes from './routes';
import './styles.css';

window.DEV_MODE = false;

function App() {
  return (
    <ProvideAuth>
      <div className="App">
        <Routes />
      </div>
    </ProvideAuth>
  );
}

export default App;
