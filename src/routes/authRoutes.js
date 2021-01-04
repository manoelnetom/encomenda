import React from 'react';
import {
  Route, Switch,
} from 'react-router-dom';

// import Login from '../pages/Login/index';
import Login from '../pages/Login/index';

// Apenas irá para o componente de Login para autenticar o usuário.
export default function AuthRoutes() {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}
