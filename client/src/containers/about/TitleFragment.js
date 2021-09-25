import React from 'react';
import { Row, Col } from 'antd';
import { Trans } from '@lingui/macro';

export default () => {
  return (
    <Row type="flex" justify="space-around" style={{ textAlign: 'left' }}>
      <Col span={24}>
        <h1 className="aboutTitle">
          <Trans>About the project</Trans>
        </h1>
      </Col>
    </Row>
  );
};
