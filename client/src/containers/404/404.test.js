import React from 'react';
import { i18n } from '@lingui/core';
import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotFound from './404';
import { RouterWrapper } from '../../components/TestUtils';
import * as AppContext from '../../context';

it('renders without crashing', () => {
  const contextValues = {
    currentLanguage: 'en',
    languageChange: jest.fn(),
  };
  jest.spyOn(AppContext, 'useGlobalContext').mockImplementation(() => contextValues);
  act(() => {
    i18n.activate('en');
  });
  render(<NotFound />, { wrapper: RouterWrapper });
});
