import { arrayOf, bool, element, number, oneOf, oneOfType, shape, string } from 'prop-types';

const ColType = {
  span: number,
};

const OptionType = {
  value: string,
  text: oneOfType(string, element),
};

export const FormFieldType = {
  colon: bool,
  label: oneOfType([string, element]),
  labelCol: shape(ColType),
  note: string,
  wrapperCol: shape(ColType),
};

export const defaultFormFieldTypeProps = {
  colon: false,
  label: null,
  labelCol: { span: 24 },
  note: null,
  wrapperCol: { span: 24 },
};

export const FormInputType = {
  ...FormFieldType,
  disabled: bool,
  fieldName: string.isRequired,
  form: shape().isRequired,
  ruleOptions: shape({
    ruleName: oneOf(['email', 'required', 'max']),
    value: oneOfType([number]),
  }),
};

export const defaultFormInputTypeProps = {
  ...defaultFormFieldTypeProps,
  disabled: false,
  ruleOptions: null,
};

export const FormCheckboxType = {
  ...FormInputType,
  options: arrayOf(shape(OptionType)).isRequired,
};

export const defaultFormCheckboxTypeProps = {
  ...defaultFormInputTypeProps,
};

export const FormSelectType = {
  ...FormInputType,
  options: arrayOf(shape(OptionType)).isRequired,
};

export const defaultFormSelectTypeProps = {
  ...defaultFormInputTypeProps,
};

export const FormTextAreaType = {
  ...FormInputType,
  rows: number,
};

export const defaultFormTextAreaTypeProps = {
  ...defaultFormInputTypeProps,
  rows: 4,
};
