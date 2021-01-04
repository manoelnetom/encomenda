import { useState, useEffect } from 'react';

import { logIn, logOut, signInWithToken } from '../service/jwtService';

import history from '../history';

/*
Função criada para fazer toda a administração do usuário na aplicação.
Ao acessar a aplicação, irá verificar se tem token localStorage no useEffect.
Caso tenha, será decodificado para pegar o username e fazer uma requisição no users
para pegar os dados do usuário e direciona-lo para a Home.
Isso será possível através do authenticated que é pego pelo context.
Função handleLogIn receberá os dados de username e senha, da page Login, e fará a requisição.
Função handleLogOut removerá o usuário.

As variáveis são exportadas para serem utilizadas nos outros componentes.
*/
export default function useAuth() {
  const userValues = {
    bio: '',
    cpf: '',
    id: '',
    latters_url: '',
    phone: '',
    photo_url: '',
    scopes: [
      { id: '', name: '' },
    ],
    username: '',

  };

  const [user, setUser] = useState(userValues);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Verifica se o usuário é admin
  function verifyScopes(scopes) {
    let admin = false;

    scopes.forEach((scope) => {
      if (scope.name.toLowerCase() === 'admin') {
        admin = true;
      }
    });

    return admin;
  }

  // Ao abrir a tela, verifica se existe algum token e realiza os procedimentos de auto login
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    async function verifyToken(tokenData) {
      const response = await signInWithToken(tokenData);
      return response;
    }

    async function load() {
      if (token) {
        const response = await verifyToken(token);
        const url = history.location.pathname;

        if (response === 'Error') {
          localStorage.removeItem('token');
          setLoading(false);
          history.push('/login');
        } else {
          setUser(response);
          const verify = verifyScopes(response.scopes);
          setIsAdmin(verify);
          setAuthenticated(true);
          setLoading(false);

          if (url === '/') {
            history.push('/home');
          } else {
            history.push(url);
          }
        }
      } else {
        setLoading(false);
        history.push('/login');
      }
    }

    setTimeout(load, 1500);
  }, []);

  // Seta os dados so usuário após preencher o formulário
  async function handleLogIn(data) {
    // setLoading(true);
    const userData = await logIn(data);

    if (userData === 'Error') {
      return 'Error';
    }
    setUser(userData);
    const verifyScope = verifyScopes(userData.scopes);
    setIsAdmin(verifyScope);
    setLoading(false);
    setAuthenticated(true);
    history.push('/home');
    return 'Sucess';
  }

  // Desloga da aplicação e volta pra página de login
  function handleLogOut() {
    logOut();
    setAuthenticated(false);
    history.push('/login');
  }

  return {
    user, authenticated, handleLogIn, loading, handleLogOut, isAdmin,
  };
}
