import React from 'react';
import { i18n } from '@lingui/core';
import { act, getByText, render } from '@testing-library/react';
import SocialBar from './SocialBar';
import { LinguiWrapper } from '../TestUtils';

it('should be translated correctly in English', () => {
  act(() => {
    i18n.activate('en');
  });
  const { container } = render(<SocialBar />, { wrapper: LinguiWrapper });
  expect(getByText(container, 'DONATE')).toBeDefined();
});

it('should be translated correctly in Romanian', () => {
  act(() => {
    i18n.activate('ro');
  });
  const { container } = render(<SocialBar />, { wrapper: LinguiWrapper });
  expect(getByText(container, 'DONEAZĂ')).toBeDefined();
});
