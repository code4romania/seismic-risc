import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import * as AppContext from './context';

afterEach(cleanup);

describe('App component', () => {
  it('should render correctly', () => {
    const contextValues = {
      hereMap: null,
      searchInput: '',
      searchResults: [],
      showSearchResults: false,
      searchError: null,
      currentLanguage: 'ro',
      onHereMapLoaded: jest.fn(),
      languageChange: jest.fn(),
    };

    jest.spyOn(AppContext, 'useGlobalContext').mockImplementation(() => contextValues);
    const container = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
