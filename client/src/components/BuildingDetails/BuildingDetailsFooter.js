import React from 'react';
import { Button, Col, Row } from 'antd';
import { Trans } from '@lingui/macro';
import { InfoCircleFilled } from '@ant-design/icons';

const BuildingDetailsFooter = () => (
  <div className="buildingDetailsFooter">
    <Row type="flex" justify="space-between" gutter={['8', '8']} style={{ alignItems: 'center' }}>
      <Col className="buildingDetails__contribute">
        <InfoCircleFilled />
        <div>
          <Trans>Do you have more details about this building?</Trans>
        </div>
      </Col>
      <Col>
        <Button
          className="add-building"
          href="/adauga-cladire"
          icon="plus-circle"
          size="large"
          type="primary"
          ghost
        >
          <span>
            <Trans>Add information</Trans>
          </span>
        </Button>
      </Col>
    </Row>
  </div>
);

export default BuildingDetailsFooter;
