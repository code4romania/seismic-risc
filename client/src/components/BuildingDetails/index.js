import React from 'react';
import { Row, Descriptions, Divider } from 'antd';
import { Trans } from '@lingui/macro';
import { InfoCircleFilled } from '@ant-design/icons';
import BuildingDetailsTitle from './BuildingDetailsTitle';
import BuildingDetailsFooter from './BuildingDetailsFooter';

export default function BuildingDetails(props) {
  const { onClose, details } = props;
  return (
    <Row className="building-details">
      {details ? (
        <div>
          <Descriptions
            column={1}
            title={
              <BuildingDetailsTitle
                address={details.address}
                streetNumber={details.street_number}
                onClose={onClose}
              />
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
              <InfoCircleFilled />
            </Divider>
          </div>
          <BuildingDetailsFooter />
        </div>
      ) : (
        <p>
          <Trans>Information missing</Trans>
        </p>
      )}
    </Row>
  );
}
