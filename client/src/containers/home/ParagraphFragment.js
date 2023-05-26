import React from 'react';
import { Row, Col, Typography } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Trans } from '@lingui/macro';

const { Paragraph, Title } = Typography;

export default () => {
  return (
    <div className="about-preview">
      <Row>
        <Title level={2}>
          <EnvironmentOutlined />
          <Trans>About the project</Trans>
        </Title>
      </Row>
      <Row gutter={[0, 32]} type="flex" justify="space-between">
        <Col sm={24} md={11}>
          <Paragraph ellipsis={{ rows: 10, expandable: true }}>
            Many desktop publishing packages and web page editors now use Lorem Ipsum as their
            default model text, and a search for 'lorem ipsum' will uncover many web sites still in
            their infancy. Various versions have evolved over the years, sometimes by accident,
            sometimes on purpose (injected humour and the like) Many desktop publishing packages and
            web page editors now use Lorem Ipsum as their default model text, and a search for
            'lorem ipsum' will uncover many web sites still in their infancy. Various versions have
            evolved over the years, sometimes by accident, sometimes on purpose (injected humour and
            the like).
          </Paragraph>
        </Col>
        <Col sm={24} md={11}>
          <Paragraph ellipsis={{ rows: 10, expandable: true }}>
            Many desktop publishing packages and web page editors now use Lorem Ipsum as their
            default model text, and a search for 'lorem ipsum' will uncover many web sites still in
            their infancy. Various versions have evolved over the years, sometimes by accident,
            sometimes on purpose (injected humour and the like) Many desktop publishing packages and
            web page editors now use Lorem Ipsum as their default model text, and a search for
            'lorem ipsum' will uncover many web sites still in their infancy. Various versions have
            evolved over the years, sometimes by accident, sometimes on purpose (injected humour and
            the like)..
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
};
