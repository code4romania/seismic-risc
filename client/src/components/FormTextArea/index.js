import React from 'react';
import { Input } from 'antd';
import FormField from '../FormField';
import { defaultFormTextAreaTypeProps, FormTextAreaType } from '../../types';

const { TextArea } = Input;

const FormTextArea = ({ disabled, fieldName, form, rows, ...rest }) => {
  const { getFieldDecorator } = form;

  return (
    <FormField {...rest}>
      {getFieldDecorator(fieldName)(<TextArea disabled={disabled} rows={rows} />)}
    </FormField>
  );
};

FormTextArea.defaultProps = defaultFormTextAreaTypeProps;

FormTextArea.propTypes = FormTextAreaType;

export default FormTextArea;
