import React from 'react';
import { Select } from 'antd';
import FormField from '../FormField';
import useCreateFormValidationRules from '../../hooks/form/useFormValidationRules';
import { defaultFormSelectTypeProps, FormSelectType } from '../../types';

const { Option } = Select;

const FormSelect = ({ disabled, fieldName, form, options, rulesOptions, ...rest }) => {
  const { getFieldDecorator } = form;
  const createFormValidationRules = useCreateFormValidationRules();

  return (
    <FormField {...rest}>
      {getFieldDecorator(fieldName, {
        rules: createFormValidationRules(rulesOptions),
      })(
        <Select disabled={disabled}>
          {options.map(({ value, text }) => (
            <Option key={`${fieldName}-${value}`} value={value}>
              {text}
            </Option>
          ))}
        </Select>,
      )}
    </FormField>
  );
};

FormSelect.defaultProps = defaultFormSelectTypeProps;

FormSelect.propTypes = FormSelectType;

export default FormSelect;
