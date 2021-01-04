import React from 'react';
import {
  Typography, Box,
} from '@material-ui/core';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase/app';
// eslint-disable-next-line
import firebaseui from 'firebaseui';
import useStyles from '../style';
import firebaseConfig from '../../../service/firebaseConfig';
// Não é utilizado porém necessário para funcionar

// inicia a aplicação firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().languageCode = 'pt_br';

// Configuração da UI do firebaseUI
const uiConfig = {
  signInFlow: 'popup',
  // Mostra os metodos de autenticação.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Realiza alguma ação após autenticar com sucesso
    signInSuccessWithAuthResult: () => {
      /* Pega token para enviar para requisição e aqui será
        chamada a função para enviar o token ao backend */
      firebase.auth().currentUser.getIdToken().then((token) => console.log(token));
    },
  },
  credentialHelper: 'none',
};

function ExternalUserForm() {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.methodBox}>
        <Typography style={{ marginLeft: '15px' }}> Escolha seu método de login</Typography>
        <Box>
          <StyledFirebaseAuth uiCallback={(ui) => ui.disableAutoSignIn()} uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </Box>
      </Box>
    </>
  );
}

export default ExternalUserForm;
