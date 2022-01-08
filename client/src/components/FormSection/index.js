import { Col, Row, Typography } from 'antd';
import React from 'react';
import Chip from '../Chip';

const { Title, Text } = Typography;

const FormSection = ({ label, title, description, children }) => {
  return (
    <>
      <Row type="flex" gutter={16} align="top" style={{ flexWrap: 'nowrap' }}>
        <Col style={{ paddingTop: '8px' }}>
          <Chip label={label} />
        </Col>
        <Col style={{ width: '100%' }}>
          <Row style={{ marginBottom: '32px' }}>
            <Title level={2} style={{ fontSize: '48px', color: '#EE4036', marginBottom: '0px' }}>
              {title}
            </Title>
            <Text style={{ fontSize: '16px' }}>{description}</Text>
          </Row>
        </Col>
      </Row>
      <Row type="flex" gutter={[16, 16]} style={{ paddingBottom: '48px' }}>
        {children}
      </Row>
    </>
  );
};

export default FormSection;
