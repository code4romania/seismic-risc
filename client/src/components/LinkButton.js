import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const LinkButton = props => {
  const { children, to, ...otherProps } = props;
  return (
    <Link to={to}>
      <Button {...otherProps}>{children}</Button>
    </Link>
  );
};

export default LinkButton;
