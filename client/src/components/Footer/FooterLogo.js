import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const FooterLogo = ({ label, href, src, height }) => (
  <div className="footerLogo">
    <div className="footerLogo__label">
      <Text>{label}</Text>
    </div>
    <a href={href}>
      <img className="footerLogo__image" src={src} alt="" height={height} />
    </a>
  </div>
);

export default FooterLogo;
