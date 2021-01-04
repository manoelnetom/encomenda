import React from 'react';
import Formsy from 'formsy-react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import InputText from '../../../components/formsy/InputText/index';

function InternalUserForm(props) {
  return (
    <Formsy autoComplete="off" onSubmit={props.handleSubmit} className={props.form}>
      <div className={props.inputText}>
        <InputText
          name="username"
          margin="normal"
          type="text"
          variant="outlined"
          label="Matrícula/Email"
          value={props.values.username}
          setValue={props.setValues}
          handleChange={props.handleChange}
          placeholder="Digite sua matrícula ou email"
          validations={{
            minLength: 4,
          }}
          validationErrors={{
            minLength: 'A quantidade mínima de caracteres é 4',
          }}
          inputProps={{
            style: { fontSize: 16 },
          }}
          InputLabelProps={{
            style: { fontSize: 16 },
          }}
          FormHelperTextProps={{
            style: { fontSize: 12 },
          }}
          required
          fullWidth
        />
      </div>

      <div className={props.inputText}>
        <InputText
          name="password"
          type="password"
          margin="normal"
          variant="outlined"
          label="Senha"
          placeholder="Digite sua senha"
          value={props.values.password}
          setValue={props.setValues}
          handleChange={props.handleChange}
          validations={{
            minLength: 6,
          }}
          validationErrors={{
            minLength: 'A quantidade mínima de caracteres é 6',
          }}
          inputProps={{
            style: { fontSize: 16 },
          }}
          InputLabelProps={{
            style: { fontSize: 16 },
          }}
          FormHelperTextProps={{
            style: { fontSize: 12 },
          }}
          required
          fullWidth
        />
      </div>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        className={props.classesSubmit}
        disabled={props.isFormValid}
      >
        Entrar
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="https://suap.ifba.edu.br/comum/solicitar_trocar_senha/" target="_blank" variant="body2">
            Esqueceu sua senha?
          </Link>
        </Grid>
      </Grid>
    </Formsy>
  );
}

export default InternalUserForm;
