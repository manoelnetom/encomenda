import React from "react";
import Input from "@material-ui/core/Input";
import Search from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import "./style.css";

export default function (props) {
  return (
    <div className="searchPaper">
      <label>{props.label}</label>
      <div className="inputSearch">
        <Paper className="paperSearch" elevation={1}>
          <Search />
          <Input
            disabled={props.disabled}
            name={props.name}
            value={props.search}
            className="input"
            placeholder={props.placeholder}
            disableUnderline
            type={props.type}
            fullWidth
            inputProps={{
              "aria-label": "Search",
            }}
            onChange={props.onChangeSearch}
          />
        </Paper>
      </div>
    </div>
  );
}
