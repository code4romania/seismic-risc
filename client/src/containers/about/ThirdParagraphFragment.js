import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';

const { Paragraph } = Typography;

export default () => {
  return (
    <Row type="flex" justify="space-around" style={{ textAlign: 'left', marginBottom: '6rem' }}>
      <Col span={24}>
        <Paragraph>
          <Trans id="about.last_paragraph" />
        </Paragraph>
      </Col>
    </Row>
  );
};
