import React from 'react';
import { render } from '@testing-library/react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import '@testing-library/jest-dom/extend-expect';
import NotFound from './404';

const TestingProvider = ({ children }) => <I18nProvider i18n={i18n}>{children}</I18nProvider>;

it('renders without crashing', () => {
  render(<NotFound />, { wrapper: TestingProvider });
});
