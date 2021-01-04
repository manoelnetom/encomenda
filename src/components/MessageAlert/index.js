import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

export default function MessageAlert(props) {
  return (
    <div>
      <SweetAlert
        info={props.info}
        success={props.success}
        warning={props.warning}
        error={props.error}
        title={props.title}
        onCancel={props.onCancel}
        onConfirm={props.onCancel}
        customButtons={props.buttons}
      >
        {props.message}
      </SweetAlert>
    </div>
  );
}
