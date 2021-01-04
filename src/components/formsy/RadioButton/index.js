import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withFormsy } from 'formsy-react';
import React from 'react';

function RadioFormsy(props){
    return(
        <FormControl
            component="fieldset"
            className={props.classe}
            error={Boolean((!props.isPristine && props.showRequired) || props.errorMessage)}
        >
            <FormLabel component="legend">{props.label}</FormLabel>
            <RadioGroup name={props.name} value={props.value} onChange={props.onChange}>
                {props.children}
            </RadioGroup>
            {Boolean(props.errorMessage) && <FormHelperText>{props.errorMessage}</FormHelperText>}
        </FormControl>
    );
}

export default withFormsy(RadioFormsy);