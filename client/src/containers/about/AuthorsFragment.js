import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';

import MAME1 from '../../images/MAME1.png';
import Commitglobal from '../../images/Commitglobal.svg';

const { Paragraph } = Typography;

export default () => {
  return (
    <Row type="flex" justify="space-around" style={{ textAlign: 'left' }}>
      <Col sm={24} md={12} className="about-authors-col">
        <Paragraph style={{ padding: '1.5rem' }}>
          <Trans>A project by</Trans>
        </Paragraph>
        <img src={MAME1} alt="Make it better" width="186.36" height="80" />
      </Col>
      <Col sm={24} md={12} className="about-authors-col">
        <Paragraph style={{ padding: '1.5rem' }}>
          <Trans>Designed by</Trans>
        </Paragraph>
        <img src={Commitglobal} alt="Commit Global" width="186.36" height="80" />
      </Col>
    </Row>
  );
};
