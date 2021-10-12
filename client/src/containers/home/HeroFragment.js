import React from 'react';
import { Typography } from 'antd';
import { Trans } from '@lingui/macro';

import Hero from '../../components/Hero';

import heroImage from '../../images/home_hero.png';

const { Paragraph } = Typography;

export default () => {
  return (
    <Hero heroImage={heroImage} title={<Trans>Welcome!</Trans>}>
      <Paragraph>
        Many desktop publishing packages and web page editors now use Lorem Ipsum as their default
        model text, and a search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by accident, sometimes on
        purpose (injected humour and the like).
      </Paragraph>
    </Hero>
  );
};
