import React from 'react';
import { Col, Row } from 'antd';
import { Trans } from '@lingui/macro';
import { CloseOutlined } from '@ant-design/icons';

import { useGlobalContext } from '../../context';

export default function SearchResults(props) {
  const { onItemSelected } = props;
  const { searchResults, onCloseSearchResults } = useGlobalContext();

  const onItemClick = (poi) => {
    onItemSelected(poi);
    onCloseSearchResults();
  };

  return (
    <Col className="search-results-container">
      <Row className="search-results__title">
        <Col span={23} className="search-results__titleText">
          <Trans>Search Results</Trans>
        </Col>
        <Col span={1}>
          <CloseOutlined type="close" onClick={onCloseSearchResults} />
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
  );
}
