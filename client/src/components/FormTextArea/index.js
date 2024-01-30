import React from 'react';
import { Input } from 'antd';
import FormField from '../FormField';
import useCreateFormValidationRules from '../../hooks/form/useFormValidationRules';
import { defaultFormTextAreaTypeProps, FormTextAreaType } from '../../types';

const { TextArea } = Input;

const FormTextArea = ({ disabled, fieldName, form, rows, rulesOptions, ...rest }) => {
  const createFormValidationRules = useCreateFormValidationRules();

  return (
    <FormField {...rest} name={fieldName} rules={createFormValidationRules(rulesOptions)}>
      <TextArea disabled={disabled} rows={rows} />
    </FormField>
  );
};

FormTextArea.defaultProps = defaultFormTextAreaTypeProps;

FormTextArea.propTypes = FormTextAreaType;

export default FormTextArea;
