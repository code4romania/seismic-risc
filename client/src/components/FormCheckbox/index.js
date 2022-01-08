import React from 'react';
import { Checkbox } from 'antd';
import FormField from '../FormField';
import { defaultFormCheckboxTypeProps, FormCheckboxType } from '../../types';

const FormCheckbox = ({ disabled, fieldName, form, options, ...rest }) => {
  const { getFieldDecorator } = form;

  return (
    <FormField {...rest}>
      {getFieldDecorator(fieldName)(
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
