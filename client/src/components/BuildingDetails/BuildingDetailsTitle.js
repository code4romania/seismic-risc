import React from 'react';
import { Trans } from '@lingui/macro';
import { Row, Col, Button, Icon } from 'antd';

const BuildingDetailsTitle = ({ address, streetNumber, locality, countyCode, images, onClose }) => (
  <Row type="flex" gutter={8} className="buildingDetailsTitle">
    {address && (
      <Col>
        <Icon type="environment" />
      </Col>
    )}
    <Col>
      <span className="buildingDetailsTitle__text">
        {address}
        {streetNumber && <> {streetNumber}</>}
        {
          <span className="buildingDetailsTitle__subtext">
            <br /> {locality && countyCode ? `${locality}, ${countyCode}` : locality ?? countyCode}
          </span>
        }
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
