const reducer = (state, action) => {
  switch (action.type) {
    case 'LANGUAGE_CHANGE':
      return { ...state, currentLanguage: action.payload };

    case 'MAP_LOADED':
      return { ...state, hereMap: action.payload };

    case 'SEARCH_INPUT':
      return { ...state, searchInput: action.payload, searchError: null };

    case 'DISPLAY_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload, searchError: null };

    case 'NO_SEARCH_RESULTS': {
      let searchResultsMessage;
      switch (state.currentLanguage) {
        case 'ro':
          searchResultsMessage = 'Nu a fost găsită nici o clădire cu adresa';
          break;
        case 'hu':
        default:
          searchResultsMessage = 'No building was found matching the address';
      }
      return {
        ...state,
        searchResults: [],
        searchError: `${searchResultsMessage} "${action.payload}".`,
      };
    }

    case 'SEARCH_ERROR': {
      let searchError;
      switch (state.currentLanguage) {
        case 'ro':
          searchError = 'Serverul este indisponibil.';
          break;
        case 'hu':
        default:
          searchError = 'Server unavailable.';
      }

      return {
        ...state,
        searchResults: [],
        searchError,
      };
    }

    case 'SEARCH_LOADING': {
      return {
        ...state,
        searchLoading: action.payload,
      };
    }

    case 'SEARCH_SELECTED_BUILDING': {
      return {
        ...state,
        searchSelectedBuilding: action.payload,
      };
    }

    case 'CLEAR_SEARCH':
      return { ...state, searchResults: [], searchError: null, searchInput: '' };

    case 'RISK_CATEGORY_CHANGED':
      return { ...state, riskCategory: action.payload };

    default:
      return state;
  }
};

export default reducer;
