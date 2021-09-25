import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';

const { Paragraph } = Typography;

export default () => {
  return (
    <Row type="flex" justify="space-around" style={{ textAlign: 'left' }}>
      <Col span={24}>
        <Paragraph>
          <Trans id="about.third_paragraph" />
        </Paragraph>
      </Col>
    </Row>
  );
};
