import React from 'react';
import { Row, Col, Icon, Button, Descriptions, Divider } from 'antd';
import { Trans } from '@lingui/macro';
import { InfoCircleFilled } from '@ant-design/icons';

export default function BuildingDetails(props) {
  const { onClose, details } = props;
  return (
    <Row className="building-details">
      {details ? (
        <Row type="flex" gutter={16} style={{ flexWrap: 'nowrap' }}>
          <Col>
            <Icon type="environment" style={{ marginTop: '8px', color: '#EE4036' }} />
          </Col>
          <Col>
            <Descriptions
              column={1}
              title={
                <>
                  {details.address}
                  {details.street_number && (
                    <>
                      {' '}
                      <Trans>no.</Trans> {details.street_number}
                    </>
                  )}
                  <Button type="link">
                    <Trans>(see images)</Trans>
                  </Button>
                </>
              }
            >
              <Descriptions.Item label={<Trans>Construction Year</Trans>}>
                {details.year_built}
              </Descriptions.Item>
              <Descriptions.Item label={<Trans>Height regime</Trans>}>
                {details.height_regime}
              </Descriptions.Item>
              <Descriptions.Item label={<Trans>Risk category</Trans>}>
                {details.risk_category}
              </Descriptions.Item>
              <Descriptions.Item label={<Trans>Examination year</Trans>}>
                {details.examination_year}
              </Descriptions.Item>
              <Descriptions.Item label={<Trans>Certified expert name</Trans>}>
                {details.certified_expert}
              </Descriptions.Item>
            </Descriptions>
            <div style={{ overflow: 'hidden' }}>
              <Divider className="buildingDetails__divider" orientation="left">
                <InfoCircleFilled style={{ color: '#EE4036' }} />
              </Divider>
            </div>
            <Row type="flex" justify="space-between" gutter={16} style={{ flexWrap: 'nowrap' }}>
              <Col className="buildingDetails__contribute">
                <Trans>Do you have more details about this building?</Trans>
              </Col>
              <Col>
                <Button
                  className="add-building"
                  href="/adauga-cladire"
                  icon="plus-circle"
                  size="large"
                >
                  <span>
                    <Trans>Add information</Trans>
                  </span>
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <Icon type="close" onClick={onClose} style={{ color: '#EE4036' }} />
          </Col>
        </Row>
      ) : (
        <p>
          <Trans>Information missing</Trans>
        </p>
      )}
    </Row>
  );
}
