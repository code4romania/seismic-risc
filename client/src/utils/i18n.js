import { i18n } from '@lingui/core';

export const defaultLocale = 'ro';
const LANGUAGE_KEY = 'language';

export async function dynamicActivate(locale, shouldChange) {
  const { messages } = await import(`../locales/${locale}/messages`);
  i18n.load(locale, messages);
  i18n.loadLocaleData({
    [locale]: { plurals: {} },
  });
  i18n.activate(locale);
  if (shouldChange) {
    localStorage.setItem(LANGUAGE_KEY, locale);
    document.documentElement.lang = locale;
  }
}

export function getCurrentLanguage() {
  return localStorage.getItem(LANGUAGE_KEY) || defaultLocale;
}
