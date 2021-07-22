import React, { createContext, useReducer, useContext } from 'react';
import { i18n } from '@lingui/core';

import reducer from './reducer';
import config from './config';

const { BUILDINGS_URL } = config;

const AppContext = createContext();

const initialState = {
  hereMap: null,
  searchInput: '',
  searchResults: [],
  showSearchResults: false,
  searchError: null,
  currentLanguage: 'ro',
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const languageChange = async (locale) => {
    const { messages } = await import(`./locales/${locale}/messages`);
    i18n.load(locale, messages);
    i18n.activate(locale);
    dispatch({ type: 'LANGUAGE_CHANGE', payload: locale });
  };

  const onSearchInputChange = (searchInput) => {
    dispatch({ type: 'SEARCH_INPUT', payload: searchInput });
  };

  const searchBuildings = async (searchInput) => {
    try {
      const res = await fetch(`${BUILDINGS_URL}/search?query=${searchInput}`);
      const searchResults = await res.json();
      if (searchResults.length > 0) {
        dispatch({ type: 'DISPLAY_SEARCH_RESULTS', payload: searchResults });
      } else {
        dispatch({ type: 'NO_SEARCH_RESULTS', payload: searchInput });
      }
    } catch (err) {
      dispatch({ type: 'SEARCH_ERROR' });
    }
  };

  const onCloseSearchResults = () => {
    dispatch({ type: 'CLEAR_SEARCH' });
  };

  const onHereMapLoaded = (map) => {
    dispatch({ type: 'MAP_LOADED', payload: map });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        searchBuildings,
        onCloseSearchResults,
        onHereMapLoaded,
        onSearchInputChange,
        languageChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
