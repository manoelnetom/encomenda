import React, { createContext } from 'react';

import useAuth from '../../hooks/useAuth';

const Context = createContext();

/*
Função criada para envolver todo o app. Logo, o children se refere a todos os componentes que serão passados.
Como as informações deste contexto terá que ser passada para os outros componentes, exporta o Context.
Informações que irão no context:
  -user: dados do usuário
  -authenticated: boolean que indica se está autenticado ou não.
  -loading: boolean que poderá ser usado para implementar o spinner.
  -handleLogIn: fará a requisição passando os dados do user e verificará a resposta do login, 401 ou 200.
  -handleLogOut: retorna o usuário para a página de login.
O Context passará as informações do hook userAuth.
*/

function AuthProvider({ children }) {
  const {
    authenticated, loading, handleLogIn, handleLogOut, user, isAdmin,
  } = useAuth();

  return (
    <Context.Provider value={{
      loading, authenticated, handleLogIn, handleLogOut, user, isAdmin,
    }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
