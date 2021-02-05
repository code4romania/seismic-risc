const reducer = (state, action) => {
  switch (action.type) {
    case 'MAP_LOADED':
      return { ...state, hereMap: action.payload };

    case 'SEARCH_INPUT':
      return { ...state, searchInput: action.payload, searchError: null };

    case 'DISPLAY_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload, searchError: null };

    case 'NO_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: [],
        searchError: `Nu a fost găsită nici o clădire cu adresa "${action.payload}."`,
      };

    case 'SEARCH_ERROR':
      return {
        ...state,
        searchResults: [],
        searchError: 'Serverul este indisponibil.',
      };

    case 'CLEAR_SEARCH':
      return { ...state, searchResults: [], searchError: null, searchInput: '' };

    default:
      return state;
  }
};

export default reducer;
