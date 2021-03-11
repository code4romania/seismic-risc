import React from 'react';
import { Drawer, Typography, Row, Col, Icon } from 'antd';
import { Trans } from '@lingui/macro';

const { Title } = Typography;

export default function BuildingDetails(props) {
  const { visible, onClose, details } = props;
  return (
    <Drawer
      placement="right"
      mask={false}
      visible={visible}
      onClose={onClose}
      getContainer={false}
      style={{ position: 'absolute' }}
    >
      <Title className="building-details-title" level={3}>
        <Row>
          <Col lg={1} span={0}>
            <Icon type="environment" />
          </Col>
          <Col lg={{ span: 22, offset: 1 }} span={24}>
            <Trans>Building Info</Trans>
          </Col>
        </Row>
      </Title>
      {details ? (
        <div>
          <Row>
            <Col lg={{ span: 13, offset: 2 }} span={13}>
              <Trans>Address</Trans>:
            </Col>
            <Col lg={9} span={11}>
              {details.address} <Trans>no.</Trans> {details.post_code}
            </Col>
          </Row>
          <Row>
            <Col lg={{ span: 13, offset: 2 }} span={13}>
              <Trans>Construction Year</Trans>:
            </Col>
            <Col lg={9} span={11}>
              {details.year_built}
            </Col>
          </Row>
          <Row>
            <Col lg={{ span: 13, offset: 2 }} span={13}>
              <Trans>Height regime</Trans>:
            </Col>
            <Col lg={9} span={11}>
              {details.height_regime}
            </Col>
          </Row>
          <Row>
            <Col lg={{ span: 13, offset: 2 }} span={13}>
              <Trans>Risk category</Trans>:
            </Col>
            <Col lg={9} span={11}>
              {details.risk_category}
            </Col>
          </Row>
          <Row gutter={1}>
            <Col lg={{ span: 13, offset: 2 }} span={13}>
              <Trans>Examination year</Trans>:
            </Col>
            <Col lg={9} span={11}>
              {details.examination_year}
            </Col>
          </Row>
          <Row>
            <Col lg={{ span: 13, offset: 2 }} span={13}>
              <Trans>Certified expert name</Trans>:
            </Col>
            <Col lg={9} span={11}>
              {details.certified_expert}
            </Col>
          </Row>
        </div>
      ) : (
        <p>
          <Trans>Information missing</Trans>
        </p>
      )}
    </Drawer>
  );
}
