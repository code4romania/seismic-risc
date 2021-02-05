import React, { useEffect } from 'react';
import { Row, Col, Input, Typography, message } from 'antd';

import { useGlobalContext } from '../../context';

const { Search } = Input;
const { Title, Paragraph } = Typography;

export default () => {
  const { searchBuildings, searchError, searchInput, onSearchInputChange } = useGlobalContext();

  useEffect(() => {
    if (searchError) {
      message.warning(searchError);
    }
  });

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
        <Title level={3}>Verifică aici dacă o clădire se află pe lista de risc seismic:</Title>
        <Search
          value={searchInput}
          loading={false}
          placeholder="Scrie adresa clădirii aici"
          onChange={(e) => onSearchInputChange(e.target.value)}
          onSearch={(value) => searchBuildings(value)}
          style={{ width: '80%' }}
        />
      </Col>
    </Row>
  );
};
