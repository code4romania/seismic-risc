import React from "react";
import {Button} from "antd";
import {Link} from "react-router-dom";

const LinkButton = ({ children, to, ...props }) => (
  <Link to={to}>
    <Button {...props}>
      {children}
    </Button>
  </Link>
);

export default LinkButton;
