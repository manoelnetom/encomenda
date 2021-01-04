import React from 'react';
import './style/global.css';
import { Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Routes from './routes/index';
import { AuthProvider } from './contexts/authContext/AuthContext';
import history from './history';

/*
AuthProvider irá envolver todos os componentes.
*/

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router history={history}>
          <Routes />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}
export default App;
