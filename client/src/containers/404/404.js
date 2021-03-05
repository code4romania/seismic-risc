import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import Layout from '../../components/Layout';
import logo from '../../logo-big.svg';

const { Title, Paragraph } = Typography;

const NotFound = () => {
  const fontStyle = {
    fontSize: '16px',
  };

  return (
    <Layout>
      <div className="page">
        <Row
          type="flex"
          justify="center"
          gutter={0}
          style={{ marginTop: '10%', marginBottom: '10%' }}
        >
          <Col lg={9} sm={24}>
            <img src={logo} width="100%" />
          </Col>
          <Col lg={9} sm={24} style={{ paddingTop: '4%' }}>
            <Title level={1} underline>
              <Trans id="404.title" />
            </Title>
            <Paragraph style={fontStyle}>
              <Trans id="404.sorry_message" />
            </Paragraph>
            <Paragraph style={fontStyle}>
              <Trans id="404.contact_message" />
              <a href="mailto:contact@code4.ro"> contact@code4.ro</a>.
            </Paragraph>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};
export default NotFound;
