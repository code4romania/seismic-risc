import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Typography, message } from 'antd';
import { Trans } from '@lingui/macro';

import { useGlobalContext } from '../../context';

const { Search } = Input;
const { Title, Paragraph } = Typography;

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
      <Col span={16}>
        <Paragraph ellipsis={{ rows: 3, expandable: true }}>
          Many desktop publishing packages and web page editors now use Lorem Ipsum as their default
          model text, and a search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by accident, sometimes on
          purpose (injected humour and the like).
        </Paragraph>
        <Title level={3}>
          <Trans>Check here if a building is on the seismic risk list</Trans>:
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
