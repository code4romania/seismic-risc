import React from 'react';
import { Form } from 'antd';
import FormLabelWithNote from '../FormLabelWithNote';
import { defaultFormFieldTypeProps, FormFieldType } from '../../types';

const FormField = ({ children, label, note, ...rest }) => {
  return (
    <Form.Item label={<FormLabelWithNote label={label} note={note} />} {...rest}>
      {children}
    </Form.Item>
  );
};

FormField.defaultProps = defaultFormFieldTypeProps;

FormField.propTypes = FormFieldType;

export default FormField;
