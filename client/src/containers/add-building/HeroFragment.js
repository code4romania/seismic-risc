import React from 'react';
import { Typography } from 'antd';
import { Trans } from '@lingui/macro';

import Hero from '../../components/Hero';

import heroImage from '../../images/add_building_hero.png';

const { Paragraph } = Typography;

export default () => {
  return (
    <Hero heroImage={heroImage} title={<Trans>Add a building</Trans>}>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus id id ut aenean nunc. Morbi
        rhoncus, ut vitae eget pellentesque sollicitudin leo sollicitudin. Phasellus orci pulvinar
        amet, tincidunt gravida volutpat quam vitae. Leo est eu ullamcorper vel odio leo facilisi
        ultrices amet. Diam et nam pellentesque augue vel eget commodo et posuere. Posuere non
        auctor ut sed vulputate. Cursus neque, nibh nisl, phasellus mauris mattis.
      </Paragraph>
    </Hero>
  );
};
