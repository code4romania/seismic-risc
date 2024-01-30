import React from 'react';
import { Radio } from 'antd';
import FormField from '../FormField';
import useCreateFormValidationRules from '../../hooks/form/useFormValidationRules';
import { defaultFormRadioTypeProps, FormRadioType } from '../../types';

const FormRadio = ({ disabled, fieldName, form, onChange, options, rulesOptions, ...rest }) => {
  const createFormValidationRules = useCreateFormValidationRules();

  return (
    <FormField {...rest} name={fieldName} rules={createFormValidationRules(rulesOptions)}>
      <Radio.Group disabled={disabled} onChange={onChange}>
        {options.map(({ value, text }) => (
          <React.Fragment key={`${fieldName}-${value}`}>
            <Radio value={value}>{text}</Radio>
            <br />
          </React.Fragment>
        ))}
      </Radio.Group>
    </FormField>
  );
};

FormRadio.defaultProps = defaultFormRadioTypeProps;

FormRadio.propTypes = FormRadioType;

export default FormRadio;
