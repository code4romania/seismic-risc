import React from 'react';
import { Button, Typography } from 'antd';
import { Trans } from '@lingui/macro';

import Hero from '../../components/Hero';

import heroImage from '../../images/thank_you_hero.png';

const { Paragraph } = Typography;

export default () => {
  return (
    <Hero heroImage={heroImage} title={<Trans>Thank you</Trans>}>
      <Paragraph>
        <Trans id="thank-you-message">
          Thank you for the information that you sent us. In the following days someone from our
          team will evaluate the information sent to us and, as soon as we will have all the
          necessary data to add the building on the map, we will notify you.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>In the meantime, keep being awesome!</Trans>
      </Paragraph>
      <Button className="hero-btn-primary" href="/">
        <Trans>Back to home page</Trans>
      </Button>
    </Hero>
  );
};
