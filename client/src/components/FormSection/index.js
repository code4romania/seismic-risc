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
        <Col>
          <Row style={{ marginBottom: '32px' }}>
            <Title level={1} style={{ fontSize: '48px', color: '#EE4036', marginBottom: '0px' }}>
              {title}
            </Title>
            <Text>{description}</Text>
          </Row>
          <Row>{children}</Row>
        </Col>
      </Row>
    </>
  );
};

export default FormSection;
