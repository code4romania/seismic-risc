import { Col, Row, Typography } from 'antd';
import React from 'react';
import Chip from '../Chip';

const { Title, Text } = Typography;

const FormSection = ({ label, title, description, children }) => {
  return (
    <>
      <Row type="flex" gutter={16} align="middle" className="form-section-header">
        <Col className="form-chip-container">
          <Chip label={label} />
        </Col>
        <Col className="form-title-container">
          <Row>
            <Title level={2} className="form-section-title">
              {title}
            </Title>
            <Text className="form-section-description">{description}</Text>
          </Row>
        </Col>
      </Row>
      <Row type="flex" gutter={[16, 16]} className="form-section-container">
        {children}
      </Row>
    </>
  );
};

export default FormSection;
