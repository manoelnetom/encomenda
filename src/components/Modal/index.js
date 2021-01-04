import React from 'react';
import Modal from '@material-ui/core/Modal';
import useStyles from './style';

function StyledModal(props) {
  const classes = useStyles();

  return (
    <div>
      <Modal open={props.open} onClose={props.handleClose}>
        <div className={classes.modal}>
          {props.children}
        </div>
      </Modal>
    </div>
  );
}

export default StyledModal;
