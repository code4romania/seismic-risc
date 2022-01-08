import React, { useMemo } from 'react';
import { Form, Select } from 'antd';
import { Trans } from '@lingui/macro';
import PropTypes from 'prop-types';

const EmptyFieldMessage = () => <Trans>Cannot be left empty!</Trans>;

const FormSelect = ({ disabled, fieldName, form, label, options, required }) => {
  const { getFieldDecorator } = form;

  const rules = useMemo(() => {
    const newRules = [];

    if (required) {
      newRules.push({ required: true, message: <EmptyFieldMessage /> });
    }

    return newRules;
  }, [required]);

  return (
    <Form.Item colon label={label}>
      {getFieldDecorator(fieldName, {
        rules,
      })(<Select disabled={disabled}>{options}</Select>)}
    </Form.Item>
  );
};

FormSelect.defaultProps = {
  disabled: null,
  label: null,
  required: null,
};

FormSelect.propTypes = {
  disabled: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  form: PropTypes.shape().isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  options: PropTypes.arrayOf(PropTypes.element).isRequired,
  required: PropTypes.bool,
};

export default FormSelect;
