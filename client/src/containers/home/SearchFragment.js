import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Typography, message } from 'antd';
import { Trans } from '@lingui/macro';

import { ReactComponent as InfoIcon } from '../../images/info-circle-solid.svg';

import { useGlobalContext } from '../../context';

const { Search } = Input;
const { Title } = Typography;

export default () => {
  const {
    currentLanguage,
    searchBuildings,
    searchError,
    searchInput,
    onSearchInputChange,
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
        <Search
          value={searchInput}
          loading={false}
          placeholder={searchPlaceholderText}
          onChange={(e) => onSearchInputChange(e.target.value)}
          onSearch={(value) => searchBuildings(value)}
          style={{ width: '80%' }}
        />
      </Col>
    </Row>
  );
};
