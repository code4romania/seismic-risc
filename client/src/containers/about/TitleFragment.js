import React from 'react';
import { Row, Col } from 'antd';
import { Trans } from '@lingui/macro';

export default () => {
  return (
    <Row type="flex" justify="space-around" style={{ margin: '1rem', textAlign: 'left' }}>
      <Col sm={24} md={22}>
        <h1 className="aboutTitle">
          <Trans>Despre proiect</Trans>
        </h1>
      </Col>
    </Row>
  );
};
