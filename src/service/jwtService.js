import axios from "axios";
import jwtDecode from "jwt-decode";

/*
Função que fará o login do usuário, retornando o token ou a resposta da api
a depender do status.
*/
async function getToken(data) {
  let apiData;

  await axios
    .post("public/ldap-login", data)
    .then((response) => {
      apiData = response.data;
    })
    .catch((error) => {
      if (error) {
        apiData = "Error";
      }
    });

  return apiData;
}

/*
Faz uma requisição para pegar os dados do usuário passando o token, que é decodificado
para pegar o username que é passado no parâmetro.
*/
export async function signInWithToken(token) {
  const decodedToken = jwtDecode(token);
  const { username } = decodedToken.user;
  let userData;

  axios.defaults.headers.Authorization = `Bearer ${token}`;

  await axios
    .get(`/users/${username}`)
    .then((response) => {
      userData = response.data;
    })
    .catch((err) => {
      userData = "Error";
    });

  return userData;
}

/*
Faz o login do usuário passando data (username + senha) em formato json.
Tendo token, é salvo no localStorage.
*/
export async function logIn(data) {
  const tokenData = await getToken(data);
  let userData;
  if (tokenData === 'Error') {
    userData = 'Error';
  } else {
    localStorage.setItem("token", JSON.stringify(tokenData.token));
    userData = await signInWithToken(tokenData.token);
  }

  return userData;
}

/*
Remoção do token do localStorage e atualização do authorization.
*/
export function logOut() {
  localStorage.removeItem("token");
  axios.defaults.headers.Authorization = undefined;
}
