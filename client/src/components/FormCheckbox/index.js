import React from 'react';
import { Checkbox, Form } from 'antd';
import PropTypes from 'prop-types';

const FormCheckbox = ({ disabled, fieldName, form, label, options }) => {
  const { getFieldDecorator } = form;

  return (
    <Form.Item colon label={label}>
      {getFieldDecorator(fieldName)(
        <Checkbox.Group disabled={disabled}>
          {options.map(({ value, text }) => (
            <>
              <Checkbox value={value}>{text}</Checkbox>
              <br />
            </>
          ))}
        </Checkbox.Group>,
      )}
    </Form.Item>
  );
};

FormCheckbox.defaultProps = {
  disabled: null,
  label: null,
};

FormCheckbox.propTypes = {
  disabled: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  form: PropTypes.shape().isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      text: PropTypes.oneOfType(PropTypes.string, PropTypes.element),
    }),
  ).isRequired,
};

export default FormCheckbox;
