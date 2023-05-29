import React from 'react';
import { Input } from 'antd';
import FormField from '../FormField';
import useCreateFormValidationRules from '../../hooks/form/useFormValidationRules';
import { defaultFormInputTypeProps, FormInputType } from '../../types';

const FormInput = ({ disabled, fieldName, rulesOptions, ...rest }) => {
  const createFormValidationRules = useCreateFormValidationRules();

  return (
    <FormField {...rest} name={fieldName} rules={createFormValidationRules(rulesOptions)}>
      <Input disabled={disabled} />
    </FormField>
  );
};

FormInput.defaultProps = defaultFormInputTypeProps;

FormInput.propTypes = FormInputType;

export default FormInput;
