import 'antd/dist/reset.css';
import '../src/styles/theme.scss';
import React from 'react';
import { RouterWrapper } from '../src/components/TestUtils';
import { AppContext } from '../src/context';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <AppContext.Provider
      value={{
        searchResults: [
          {
            general_id: '1',
            address: 'Bucuresti, Str. Dambovita',
            street_number: '10',
          },
          {
            general_id: '2',
            address: 'Bucuresti, Str. Dambovita',
            street_number: '12',
          },
          {
            general_id: '3',
            address: 'Bucuresti, Str. Dambovita',
            street_number: '14',
          },
          {
            general_id: '4',
            address: 'Bucuresti, Str. Dambovita',
            street_number: '16',
          },
        ],
      }}
    >
      <RouterWrapper>
        <Story />
      </RouterWrapper>
    </AppContext.Provider>
  ),
];
