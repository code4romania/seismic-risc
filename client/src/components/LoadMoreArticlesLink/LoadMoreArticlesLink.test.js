import React from 'react';
import { i18n } from '@lingui/core';
import { act, getByText, render } from '@testing-library/react';
import { LinguiWrapper } from '../TestUtils';
import LoadMore from '.';

describe('LoadMoreArticlesLink component', () => {
  it('should be translated correctly in English', () => {
    act(() => {
      i18n.activate('en');
    });
    const { container } = render(<LoadMore />, { wrapper: LinguiWrapper });
    expect(getByText(container, 'Load more articles')).toBeDefined();
  });

  it('should be translated correctly in Romanian', () => {
    act(() => {
      i18n.activate('ro');
    });
    const { container } = render(<LoadMore />, { wrapper: LinguiWrapper });
    expect(getByText(container, 'Încarcă mai multe articole')).toBeDefined();
  });
});
