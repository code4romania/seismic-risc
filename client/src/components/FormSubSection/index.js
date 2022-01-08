import { Button, Col, Row, Typography } from 'antd';
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;

const FormSubSection = ({ children, description, label, title }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <>
      <Row type="flex" gutter={16} align="top" style={{ flexWrap: 'nowrap' }}>
        <Col style={{ width: '100%' }}>
          <Row style={{ marginBottom: '32px' }}>
            <Title level={3} style={{ color: '#525F7F', fontSize: '32px', marginBottom: '8px' }}>
              {label}. {title}
            </Title>
            <Text style={{ fontSize: '16px' }}>{description}</Text>
          </Row>
          {expanded && children}
        </Col>
        <Col style={{ paddingTop: '8px' }}>
          {!expanded ? (
            <Button icon="plus" type="primary" onClick={toggleExpanded} />
          ) : (
            <Button
              icon="minus"
              type="primary"
              style={{ border: 'none', backgroundColor: '#525F7F' }}
              onClick={toggleExpanded}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

FormSubSection.defaultProps = {
  description: null,
};

FormSubSection.propTypes = {
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default FormSubSection;
