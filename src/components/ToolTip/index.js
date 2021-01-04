import React from "react";
import { Tooltip } from "@material-ui/core";

function ToolTip({ children, title, position }) {
  return (
    <Tooltip title={title} placement={position} arrow>
      {children}
    </Tooltip>
  );
}

export default ToolTip;
