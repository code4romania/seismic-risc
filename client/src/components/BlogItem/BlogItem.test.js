import React from 'react';
import { i18n } from '@lingui/core';
import { act, render } from '@testing-library/react';
import { RouterWrapper } from '../TestUtils';
import BlogItem from './BlogItem';

describe('BlogItem component', () => {
  const postDetails = {
    title: 'Title',
    image: 'image-url',
    preview_text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    created: new Date(0),
    author_first_name: 'First',
    author_last_name: 'Last',
  };
  const size = 8;

  it('should be translated correctly in English', async () => {
    act(() => {
      i18n.activate('en');
    });
    const container = render(<BlogItem size={size} postDetails={postDetails} />, {
      wrapper: RouterWrapper,
    });

    expect(container.baseElement).toMatchSnapshot();
  });

  it('should be translated correctly in Romanian', async () => {
    act(() => {
      i18n.activate('ro');
    });
    const container = render(<BlogItem size={size} postDetails={postDetails} />, {
      wrapper: RouterWrapper,
    });
    expect(container.baseElement).toMatchSnapshot();
  });
});
