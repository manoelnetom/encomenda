import FormHelperText from "@material-ui/core/FormHelperText";
import {
  Select,
  ListItemText,
  // Checkbox,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { withFormsy } from "formsy-react";
import React from "react";
import useStyles from "./styles";

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

function SelectFormsy(props) {
  const classes = useStyles();

  return (
    <FormControl
      className={classes.formControl}
      error={Boolean(
        (!props.isPristine && props.showRequired) || props.errorMessage
      )}
      variant="outlined"
      disabled={props.disabled}
    >
      <InputLabel>{props.label}</InputLabel>
      <Select
        name={props.name}
        label={props.label}
        displayEmpty
        labelWidth={60}
        value={props.value}
        onChange={props.onChange}
        // renderValue={(selected) => {
        //     if (selected.length === 0) {
        //         return;
        //     }
        //     return selected.join(', ');
        // }}
        MenuProps={MenuProps}
        inputProps={{ id: `demo-simple-select-outlined-label${props.name}` }}
        disabled={props.disabled}
      >
        {props.itens.map((item) => (
          <MenuItem
            key={item.id}
            value={item.description}
            disabled={props.disabled}
          >
            {/* <Checkbox checked={props.value.indexOf(item.description) > -1} /> */}
            <ListItemText primary={item.description} />
          </MenuItem>
        ))}
      </Select>
      {Boolean(props.errorMessage) && (
        <FormHelperText>{props.errorMessage}</FormHelperText>
      )}
    </FormControl>
  );
}

export default withFormsy(SelectFormsy);
