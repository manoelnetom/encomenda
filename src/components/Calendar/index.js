import 'date-fns';
import { ptBR } from 'date-fns/locale';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

/*
Componente de calendário para ser utilizado nos formulários
*/

function Calendar(props) {
  return (
    <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        minDate={props.minDate}
        inputVariant="outlined"
        format="dd/MM/yyyy"
        margin="normal"
        fullWidth
        id={`date-picker-outlined${props.id}${props.label}`}
        helperText={props.errorDate ? props.messageError : ''}
        invalidDateMessage={props.messageInvalidDate}
        label={props.label}
        value={props.selectedDate}
        onChange={props.handleDate}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        InputProps={{
          className: props.errorDate ? props.className : '',
        }}
        disabled={props.disabled}
      />
    </MuiPickersUtilsProvider>
  );
}

export default Calendar;
