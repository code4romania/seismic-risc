import React, { useCallback } from 'react';
import { Trans } from '@lingui/macro';

const useCreateFormValidationRules = () => {
  return useCallback((rulesOptions) => {
    if (!rulesOptions) return [];

    return rulesOptions.map(({ ruleName, value }) => {
      switch (ruleName) {
        case 'email':
          return { type: ruleName, message: <Trans>Email address is not valid!</Trans> };
        case 'integer':
          return {
            pattern: /^[1-9]\d*$/,
            message: <Trans>Value must be a number greater than zero!</Trans>,
          };
        case 'required':
          return { required: true, message: <Trans>Cannot be left empty!</Trans> };
        case 'max':
          return {
            max: value,
            message: <Trans>Field cannot exceed a maximum of {value} characters!</Trans>,
          };
        default:
          return null;
      }
    });
  }, []);
};

export default useCreateFormValidationRules;
