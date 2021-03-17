import React from 'react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { MemoryRouter } from 'react-router-dom';
import { messages as enMessages } from '../locales/en/messages';
import { messages as roMessages } from '../locales/ro/messages';

i18n.load({
  en: enMessages,
  ro: roMessages,
});
i18n.loadLocaleData({
  en: { plurals: {} },
  ro: { plurals: {} },
});

const LinguiWrapper = ({ children }) => <I18nProvider i18n={i18n}>{children}</I18nProvider>;

const RouterWrapper = ({ children }) => (
  <MemoryRouter>
    <LinguiWrapper>{children}</LinguiWrapper>
  </MemoryRouter>
);

export { LinguiWrapper, RouterWrapper };
