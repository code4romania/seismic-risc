import { Button, Col, Row, Typography } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const { Title, Text } = Typography;

const FormSubSection = ({ children, description, label, title }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const expandBtnClass = useMemo(() => classNames({ expanded }), [expanded]);

  return (
    <Row type="flex" gutter={16} align="top" className="form-subsection-header">
      <Col className="form-title-container">
        <Row>
          <Title level={3} className="form-subsection-title">
            {label}. {title}
          </Title>
          <Text className="form-subsection-description">{description}</Text>
        </Row>
        {expanded && children}
      </Col>
      <Col className="form-subsection-expand-btn">
        {!expanded ? (
          <Button icon="plus" type="primary" onClick={toggleExpanded} />
        ) : (
          <Button icon="minus" type="primary" className={expandBtnClass} onClick={toggleExpanded} />
        )}
      </Col>
    </Row>
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
