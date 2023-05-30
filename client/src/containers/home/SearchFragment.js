import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Typography, App, Input, Spin, Tooltip, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Trans } from '@lingui/macro';
import { debounce, groupBy } from 'lodash';

import { ReactComponent as InfoIcon } from '../../images/info-circle-solid.svg';

import { useGlobalContext } from '../../context';

const { Title } = Typography;

const Suffix = ({ input, loading }) => {
  if (loading) {
    return <Spin />;
  }
  if (!input) {
    return <SearchOutlined />;
  }
  return <span />;
};

export default () => {
  const {
    currentLanguage,
    searchBuildings,
    searchResults,
    searchLoading,
    searchError,
    onSearchInputChange,
    onSearchLoading,
    onSearchSelectBuilding,
    searchInput,
    riskCategory,
  } = useGlobalContext();
  const { message } = App.useApp();
  const [searchPlaceholderText, setSearchPlaceholderText] = useState('');

  useEffect(() => {
    if (searchError) {
      message.warning(searchError);
    }
  }, [searchError]);

  useEffect(() => {
    switch (currentLanguage) {
      case 'ro':
        setSearchPlaceholderText('Caută o adresă aici');
        break;

      case 'hu':
      default:
        setSearchPlaceholderText('Search for an address here');
    }
  }, [currentLanguage]);

  const dataByGeneralId = groupBy(searchResults, (item) => item.general_id);
  const dataSource = searchResults
    ? searchResults.map((item) => {
        return {
          id: item.general_id,
          value: item.street_number
            ? `${item.address}, ${item.street_number} (${item.locality}, ${item.county_code})`
            : `${item.address} (${item.locality}, ${item.county_code})`,
        };
      })
    : [];

  const debounceSearch = useRef(debounce(searchBuildings, 1000)).current;
  const onSearch = (value) => {
    if (value.length > 2) {
      onSearchLoading(true);
      debounceSearch(value, riskCategory);
    }
  };

  const onSelect = (_, { id }) => {
    const selectedBuilding = dataByGeneralId[id] && dataByGeneralId[id][0];
    if (selectedBuilding) {
      onSearchSelectBuilding(dataByGeneralId[id][0]);
    }
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="top"
      style={{ marginTop: '2rem', marginBottom: '2rem', textAlign: 'center' }}
    >
      <Col sm={26} md={16}>
        <Title level={3}>
          <Trans>
            Check here if a building is on the{' '}
            {/* @TODO replace lorem text with actual text + translations */}
            <Tooltip
              title="
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam nemo, cum ratione
                  explicabo architecto ex dolore incidunt nisi quisquam dolores? Facere ipsa quam
                  modi laborum possimus, accusantium dolor a adipisci.
                "
              placement="top"
              trigger={['hover', 'click']}
            >
              <div className="badge">
                <span>seismic risk</span>
                <InfoIcon />
              </div>
            </Tooltip>{' '}
            list
          </Trans>
          :
        </Title>

        <AutoComplete
          value={searchInput}
          options={dataSource}
          onChange={onSearchInputChange}
          onSearch={onSearch}
          onSelect={onSelect}
          style={{ width: '80%' }}
        >
          <Input
            minLength={3}
            placeholder={searchPlaceholderText}
            allowClear={!searchLoading}
            suffix={<Suffix input={searchInput} loading={searchLoading} />}
          />
        </AutoComplete>
      </Col>
    </Row>
  );
};
