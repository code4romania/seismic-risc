import React from 'react';
import { Checkbox } from 'antd';
import FormField from '../FormField';
import useCreateFormValidationRules from '../../hooks/form/useFormValidationRules';
import { defaultFormCheckboxTypeProps, FormCheckboxType } from '../../types';

const FormCheckbox = ({ disabled, fieldName, form, onChange, options, rulesOptions, ...rest }) => {
  const createFormValidationRules = useCreateFormValidationRules();

  return (
    <FormField {...rest} name={fieldName} rules={createFormValidationRules(rulesOptions)}>
      <Checkbox.Group disabled={disabled} onChange={onChange}>
        {options.map(({ value, text }) => (
          <React.Fragment key={`${fieldName}-${value}`}>
            <Checkbox value={value}>{text}</Checkbox>
            <br />
          </React.Fragment>
        ))}
      </Checkbox.Group>
    </FormField>
  );
};

FormCheckbox.defaultProps = defaultFormCheckboxTypeProps;

FormCheckbox.propTypes = FormCheckboxType;

export default FormCheckbox;
