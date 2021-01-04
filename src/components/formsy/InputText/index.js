import TextField from '@material-ui/core/TextField';
import React from 'react';
import { withFormsy } from 'formsy-react';

/*
Input que será utilizado em todos os forms.
Como está utilizando o formsy, as validações também serão passadas no props
como pode observar no page/Login/index.js. Toda a verificação será feita
internamente.
inputProps: estiliza o input, como fontSize, por ex.
InputProps: estiliza o label do input.
FormHelperTextProps: estiliza a mensagem de erro.
*/

function InputText({
  name, setValue, fullWidth, handleChange, multiline, autoFocus,  margin, rowsMax, rows, variant, type, label, onChange, disabled, inputProps, disableValue, required, InputLabelProps, value, isPristine, showRequired, errorMessage, FormHelperTextProps, placeholder, InputProps
}) {
  function changeValue(event) {
    setValue(event.target.value);
    if (handleChange) { handleChange(event); }
  }

  return (
    <TextField
      name={name}
      variant="outlined"
      type={type}
      label={label}
      onChange={changeValue}
      inputProps={inputProps}
      InputLabelProps={InputLabelProps}
      value={value}
      error={Boolean((!isPristine && showRequired && value.length !== 0) || errorMessage)}
      helperText={errorMessage}
      FormHelperTextProps={FormHelperTextProps}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      rowsMax={rowsMax}
      autoFocus={autoFocus}
      margin={margin}
      fullWidth={fullWidth}
      InputProps={InputProps}
    />
  );
}

export default withFormsy(InputText);
