import React from 'react';
import { Trans } from '@lingui/macro';
import { Row, Col, Button, Icon } from 'antd';

const BuildingDetailsTitle = ({ address, streetNumber, images, onClose }) => (
  <Row type="flex" gutter={8} className="buildingDetailsTitle">
    {address && (
      <Col>
        <Icon type="environment" />
      </Col>
    )}
    <Col>
      <span className="buildingDetailsTitle__text">
        {address}
        {streetNumber && (
          <>
            {' '}
            <Trans>no.</Trans> {streetNumber}
          </>
        )}
      </span>
      {images && (
        <Button type="link">
          (<Trans>see images</Trans>)
        </Button>
      )}
    </Col>
    <Col style={{ marginLeft: 'auto' }}>
      <Icon type="close" onClick={onClose} />
    </Col>
  </Row>
);

export default BuildingDetailsTitle;
