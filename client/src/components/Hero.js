import React from 'react';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

export default ({ heroImage, title, children }) => {
  return (
    <div className="hero-container">
      <Row className="container hero-body" type="flex" align="middle" justify="space-between">
        <Col sm={24} md={12}>
          <img src={heroImage} />
        </Col>
        <Col sm={24} md={11}>
          <Title level={2} className="hero-title">
            {title}
          </Title>
          {children}
        </Col>
      </Row>
    </div>
  );
};
