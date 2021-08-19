import React from 'react';
import { Card, Col, Icon, Row, Typography } from 'antd';
import { Trans } from '@lingui/macro';

import { useGlobalContext } from '../../context';

export default function SearchResults(props) {
  const { onItemSelected } = props;
  const { searchResults, onCloseSearchResults } = useGlobalContext();

  const onItemClick = (poi) => {
    onItemSelected(poi);
    onCloseSearchResults();
  };

  return (
    <Card>
      <Col className="search-results-container">
        <Row>
          <Col span={23}>
            <Typography.Title level={4}>
              <Trans>Search Results</Trans>
            </Typography.Title>
          </Col>
          <Col span={1}>
            <Icon type="close" onClick={onCloseSearchResults} />
          </Col>
        </Row>
        <ul className="search-results">
          {searchResults.map((building) => (
            <li key={building.general_id} onClick={() => onItemClick(building)}>
              <p>
                {building.address}, {building.street_number}
              </p>
            </li>
          ))}
        </ul>
      </Col>
    </Card>
  );
}
