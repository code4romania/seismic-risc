import React from 'react';
import { Checkbox } from 'antd';
import FormField from '../FormField';
import useCreateFormValidationRules from '../../hooks/form/useFormValidationRules';
import { defaultFormCheckboxTypeProps, FormCheckboxType } from '../../types';

const FormCheckbox = ({ disabled, fieldName, form, options, rulesOptions, ...rest }) => {
  const { getFieldDecorator } = form;
  const createFormValidationRules = useCreateFormValidationRules();

  return (
    <FormField {...rest}>
      {getFieldDecorator(fieldName, { rules: createFormValidationRules(rulesOptions) })(
        <Checkbox.Group disabled={disabled}>
          {options.map(({ value, text }) => (
            <React.Fragment key={`${fieldName}-${value}`}>
              <Checkbox value={value}>{text}</Checkbox>
              <br />
            </React.Fragment>
          ))}
        </Checkbox.Group>,
      )}
    </FormField>
  );
};

FormCheckbox.defaultProps = defaultFormCheckboxTypeProps;

FormCheckbox.propTypes = FormCheckboxType;

export default FormCheckbox;
