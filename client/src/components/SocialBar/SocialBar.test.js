import React from 'react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { act, getByText, render } from '@testing-library/react';
import SocialBar from './SocialBar';
import { messages as enMessages } from '../../locales/en/messages';
import { messages as roMessages } from '../../locales/ro/messages';

i18n.load({
  en: enMessages,
  ro: roMessages,
});

const TestingProvider = ({ children }) => <I18nProvider i18n={i18n}>{children}</I18nProvider>;

it('should be translated correctly in English', () => {
  act(() => {
    i18n.activate('en');
  });
  const { container } = render(<SocialBar />, { wrapper: TestingProvider });
  expect(getByText(container, 'DONATE')).toBeDefined();
});

it('should be translated correctly in Romanian', () => {
  act(() => {
    i18n.activate('ro');
  });
  const { container } = render(<SocialBar />, { wrapper: TestingProvider });
  expect(getByText(container, 'DONEAZĂ')).toBeDefined();
});
