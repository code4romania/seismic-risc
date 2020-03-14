import React from 'react';
import { Row, Col, Input, Typography } from 'antd';

const { Search } = Input;
const { Title, Paragraph } = Typography;

export default () => (
  <Row type="flex" justify="center" align="top" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
    <Col span={16}>
      <Paragraph ellipsis={{ rows: 3, expandable: true }}>
        Many desktop publishing packages and web page editors now use Lorem Ipsum as their default
        model text, and a search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by accident, sometimes on
        purpose (injected humour and the like).
      </Paragraph>
      <Title level={3}>Verifică aici dacă o clădire se află pe lista de risc seismic:</Title>
      <Search
        loading={false}
        placeholder="Scrie adresa clădirii aici"
        onSearch={value => value}
        style={{ width: '80%' }}
      />
    </Col>
  </Row>
);
