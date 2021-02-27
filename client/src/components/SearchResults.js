import React from 'react';
import { Drawer, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import './searchResults.css';

import { useGlobalContext } from '../context';

export default function SearchResults(props) {
  const { onItemSelected } = props;
  const { searchResults, onCloseSearchResults } = useGlobalContext();

  const onItemClick = (poi) => {
    onItemSelected(poi);
    onCloseSearchResults();
  };

  return (
    <Drawer
      className="search-results-drawer"
      placement="right"
      mask={false}
      onClose={onCloseSearchResults}
      visible={searchResults.length > 0}
      getContainer={false}
      style={{ position: 'absolute' }}
    >
      <Typography.Title level={4} style={{ color: 'white' }}>
        <Trans>Search Results</Trans>
      </Typography.Title>
      <ul className="search-results">
        {searchResults.map((building) => (
          <li key={building.general_id} onClick={() => onItemClick(building)}>
            <p>
              {building.address}, {building.post_code}
            </p>
          </li>
        ))}
      </ul>
    </Drawer>
  );
}
