import React, { useMemo } from 'react';
import { Form, Input } from 'antd';
import { Trans } from '@lingui/macro';
import PropTypes from 'prop-types';

const EmptyFieldMessage = () => <Trans>Cannot be left empty!</Trans>;

const MaxLengthMessage = ({ maxLen }) => (
  <Trans>Field cannot exceed a maximum of {maxLen} characters!</Trans>
);

const EmailTypeMessage = () => <Trans>Email address is not valid!</Trans>;

const FormInput = ({ disabled, fieldName, form, label, maxLen, required, type }) => {
  const { getFieldDecorator } = form;

  const rules = useMemo(() => {
    const newRules = [];

    if (type && type === 'email') {
      newRules.push({ type, message: <EmailTypeMessage /> });
    }

    if (required) {
      newRules.push({ required: true, message: <EmptyFieldMessage /> });
    }
    if (maxLen) {
      newRules.push({ max: maxLen, message: <MaxLengthMessage maxLen={maxLen} /> });
    }

    return newRules;
  }, [required, maxLen]);

  return (
    <Form.Item colon label={label}>
      {getFieldDecorator(fieldName, {
        rules,
      })(<Input disabled={disabled} />)}
    </Form.Item>
  );
};

FormInput.defaultProps = {
  disabled: null,
  label: null,
  maxLen: null,
  required: null,
  type: null,
};

FormInput.propTypes = {
  disabled: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  form: PropTypes.shape().isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  maxLen: PropTypes.number,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['email']),
};

export default FormInput;
