import React from 'react';
import { Col, Row, Typography } from 'antd';

const { Title, Text } = Typography;

export default ({ heroImage, title, subTitle = null, children, titleLevel = 2 }) => {
  return (
    <div className="hero-container">
      <Row
        className="container hero-body"
        type="flex"
        align="middle"
        justify="space-between"
        gutter={[0, { xs: 24, sm: 24, md: 0, lg: 0 }]}
      >
        <Col sm={24} md={12}>
          <img src={heroImage} />
        </Col>
        <Col sm={24} md={11}>
          {subTitle && <Text type="secondary">{subTitle}</Text>}
          <Title level={titleLevel} className="hero-title">
            {title}
          </Title>
          {children}
        </Col>
      </Row>
    </div>
  );
};
