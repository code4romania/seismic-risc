import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Typography, message, AutoComplete, Input, Icon } from 'antd';
import { Trans } from '@lingui/macro';
import { debounce, groupBy } from 'lodash';

import { ReactComponent as InfoIcon } from '../../images/info-circle-solid.svg';

import { useGlobalContext } from '../../context';

const { Title } = Typography;

export default () => {
  const {
    currentLanguage,
    searchBuildings,
    searchResults,
    searchError,
    onSearchInputChange,
    searchInput,
  } = useGlobalContext();

  const [searchPlaceholderText, setSearchPlaceholderText] = useState('');

  useEffect(() => {
    if (searchError) {
      message.warning(searchError);
    }
  }, [searchError]);

  useEffect(() => {
    switch (currentLanguage) {
      case 'ro':
        setSearchPlaceholderText('Scrie adresa clădirii aici');
        break;

      case 'hu':
      default:
        setSearchPlaceholderText('Insert building address here');
    }
  }, [currentLanguage]);

  const dataByStreet = groupBy(searchResults, (item) => item.general_id);
  const dataSource = searchResults
    ? searchResults.map((item) => {
        return { value: item.general_id, text: `${item.address}, ${item.street_number}` };
      })
    : [];

  const onSearch = useRef(debounce(searchBuildings, 1000)).current;

  const onSelect = (value) => {
    console.log('select', dataByStreet[value][0]);
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="top"
      style={{ marginTop: '2rem', marginBottom: '2rem' }}
    >
      <Col sm={26} md={16}>
        <Title level={3}>
          <Trans>
            Check here if a building is on the{' '}
            <span className="badge">
              seismic risk <InfoIcon />
            </span>{' '}
            list
          </Trans>
          :
        </Title>
        <AutoComplete
          allowClear
          value={searchInput}
          dataSource={dataSource}
          onChange={onSearchInputChange}
          onSearch={onSearch}
          onSelect={onSelect}
          placeholder={searchPlaceholderText}
          style={{ width: '80%' }}
        >
          <Input suffix={<Icon type="search" />} />
        </AutoComplete>
      </Col>
    </Row>
  );
};
