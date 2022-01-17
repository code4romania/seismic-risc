import { arrayOf, bool, element, number, oneOf, oneOfType, shape, string } from 'prop-types';

const ColType = {
  span: number,
};

const OptionType = {
  value: string,
  text: oneOfType([string, element]),
};

export const FormFieldType = {
  colon: bool,
  label: oneOfType([string, element]),
  labelCol: shape(ColType),
  note: oneOfType([string, element]),
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
  rulesOptions: arrayOf(
    shape({
      ruleName: oneOf(['email', 'required', 'max', 'integer', 'gdpr', 'captcha']),
      value: oneOfType([number]),
    }),
  ),
};

export const defaultFormInputTypeProps = {
  ...defaultFormFieldTypeProps,
  disabled: false,
  rulesOptions: null,
};

export const FormCheckboxType = {
  ...FormInputType,
  options: arrayOf(shape(OptionType)).isRequired,
};

export const defaultFormCheckboxTypeProps = {
  ...defaultFormInputTypeProps,
};

export const FormRadioType = {
  ...FormInputType,
  options: arrayOf(shape(OptionType)).isRequired,
};

export const defaultFormRadioTypeProps = {
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
