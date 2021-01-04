import React, { useContext } from 'react';
import AppRoutes from './appRoutes';
import AuthRoutes from './authRoutes';
import Spinner from '../components/Loader/index';
import { Context } from '../contexts/authContext/AuthContext';

/*
Recebe o loading e authenticated do useAuth. Se o authenticated for true é chamado os componentes
do AppRoutes, caso contrário a página Login no AuthRoutes para fazer a autenticação.
*/

function Routes() {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return (
      <Spinner
        type="Puff"
        color="#020887"
        height={100}
        width={100}

      />

    );
  }

  return authenticated && !loading ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
