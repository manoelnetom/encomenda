import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';

/*
Caixa de dialogo simples para exibir qualquer tipo de informação na tela.
Precisa passar pelo props:
    -variável open: iniciada em false, pois a caixa não deverá sem exibida iniciamente.
    -função para o onClose: muda o open para false, é onde ela é fechada.
    -title: o título da informação.
    -message: mensagem que deverá ser exibida.

Obs: futuramente poderá ser colocar imagens, e outros componentes caso queira estilizar.
*/
export default function DialogMessage(props) {
  return (
    <Dialog onClose={props.onClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <DialogTitle>{props.title}</DialogTitle>
      <Divider />
      <DialogContent>
        <div className={props.divMessage}>
          <img src={props.check} alt="" className={props.checkClasse} />
          {props.message}
        </div>
      </DialogContent>
      <Divider />
      <DialogActions>
        {props.children}
      </DialogActions>
    </Dialog>
  );
}
