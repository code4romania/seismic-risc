import React from 'react';
import { Trans } from '@lingui/macro';
import { Row, Col, Button, Icon } from 'antd';

const BuildingDetailsTitle = ({ address, streetNumber, onClose }) => (
  <Row type="flex" gutter={8} style={{ flexWrap: 'nowrap' }}>
    <Col>
      <Icon type="environment" />
    </Col>
    <Col>
      <div>
        {address}
        {streetNumber && (
          <>
            {' '}
            <Trans>no.</Trans> {streetNumber}
          </>
        )}
        <Button type="link">
          (<Trans>see images</Trans>)
        </Button>
      </div>
    </Col>
    <Col style={{ marginLeft: 'auto' }}>
      <Icon type="close" onClick={onClose} />
    </Col>
  </Row>
);

export default BuildingDetailsTitle;
