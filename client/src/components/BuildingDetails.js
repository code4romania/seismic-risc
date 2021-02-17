import React from 'react';
import { Drawer, Typography } from 'antd';
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
        <Trans>Building Info</Trans>
      </Title>
      {details ? (
        <div>
          <p>
            <strong>
              <Trans>Address</Trans>:
            </strong>
            {details.address}
          </p>
          <p>
            <strong>
              <Trans>Construction Year</Trans>:
            </strong>
            {details.year_built}
          </p>
          <p>
            <strong>
              <Trans>Height regime</Trans>:
            </strong>
            {details.height_regime} m
          </p>
          <p>
            <strong>
              <Trans>Total surface</Trans>:
            </strong>
            {details.surface} mp
          </p>
          <p>
            <strong>
              <Trans>Risk category</Trans>:
            </strong>
            {details.risk_category}
          </p>
          <p>
            <strong>
              <Trans>Examination year</Trans>:
            </strong>
            {details.examination_year}
          </p>
          <p>
            <strong>
              <Trans>Certified expert name</Trans>:
            </strong>
            {details.certified_expert}
          </p>
        </div>
      ) : (
        <p>
          <Trans>Information missing</Trans>
        </p>
      )}
    </Drawer>
  );
}
