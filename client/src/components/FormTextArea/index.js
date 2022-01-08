import React from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

const FormTextArea = ({ disabled, fieldName, form, label, rows }) => {
  const { getFieldDecorator } = form;

  return (
    <Form.Item colon label={label}>
      {getFieldDecorator(fieldName)(<TextArea disabled={disabled} rows={rows} />)}
    </Form.Item>
  );
};

FormTextArea.defaultProps = {
  disabled: null,
  label: null,
  rows: 4,
};

FormTextArea.propTypes = {
  disabled: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  form: PropTypes.shape().isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  rows: PropTypes.number,
};

export default FormTextArea;
