import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { i18n } from '@lingui/core';
import { act } from 'react-dom/test-utils';
import HereMapInteractive from './HereMapInteractive';
import { LinguiWrapper } from '../TestUtils';

const { H } = window;

jest.mock('../../context', () => ({
  __esModule: true,
  useGlobalContext: () => ({
    onHereMapLoaded: jest.fn(),
    searchResults: [],
    onCloseSearchResults: jest.fn(),
  }),
}));

afterEach(cleanup);

describe('HereMapInteractive component', () => {
  act(() => {
    i18n.activate('ro');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly without points', () => {
    render(<HereMapInteractive apikey="api-key" points={[]} />, { wrapper: LinguiWrapper });
    expect(H.geo.Rect).toHaveBeenCalledTimes(0);
    expect(H.clustering.DataPoint).toHaveBeenCalledTimes(0);
  });

  it('renders correctly with points', () => {
    const points = [
      {
        lat: 44.436402,
        lng: 26.099322,
      },
      {
        lat: 44.43245,
        lng: 26.101978,
      },
    ];
    render(<HereMapInteractive apikey="api-key" points={points} />, { wrapper: LinguiWrapper });
    expect(H.geo.Rect).toHaveBeenCalled();
    expect(H.clustering.DataPoint).toHaveBeenNthCalledWith(
      1,
      points[0].lat,
      points[0].lng,
      1,
      points[0],
    );
    expect(H.clustering.DataPoint).toHaveBeenNthCalledWith(
      2,
      points[1].lat,
      points[1].lng,
      1,
      points[1],
    );
  });
});
