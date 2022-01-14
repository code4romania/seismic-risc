import React, { useCallback } from 'react';
import { Trans } from '@lingui/macro';

const useCreateFormValidationRules = () => {
  return useCallback((rulesOptions) => {
    if (!rulesOptions) return [];

    return rulesOptions.map(({ ruleName, value }) => {
      switch (ruleName) {
        case 'email':
          return { type: ruleName, message: <Trans id="form.validation.email" /> };
        case 'integer':
          return {
            pattern: /^[1-9]\d*$/,
            message: <Trans id="form.validation.integer" />,
          };
        case 'required':
          return { required: true, message: <Trans id="form.validation.required" /> };
        case 'max':
          return {
            max: value,
            message: (
              <Trans id="form.validation.max">
                Field cannot exceed a maximum of {value} characters!
              </Trans>
            ),
          };
        case 'captcha':
          return { required: true, message: <Trans id="form.validation.captcha" /> };
        case 'gdpr':
          return { required: true, message: <Trans id="form.validation.gdpr" /> };
        default:
          return null;
      }
    });
  }, []);
};

export default useCreateFormValidationRules;
