import React from 'react';
import { Card, Skeleton, Row, Descriptions, Empty } from 'antd';
import { Trans } from '@lingui/macro';
import BuildingDetailsTitle from './BuildingDetailsTitle';
// import BuildingDetailsFooter from './BuildingDetailsFooter';

const BuildingDetails = ({ onClose, isLoading, details }) => {
  const detailsItems = details
    ? [
        {
          label: <Trans>Construction Year</Trans>,
          value: details.year_built,
        },
        {
          label: <Trans>Height regime</Trans>,
          value: details.height_regime,
        },
        {
          label: <Trans>Risk category</Trans>,
          value: details.risk_category,
        },
        {
          label: <Trans>Examination year</Trans>,
          value: details.examination_year,
        },
        {
          label: <Trans>Certified expert name</Trans>,
          value: details.certified_expert,
        },
      ].filter(({ value }) => value)
    : [];

  return (
    <Card className="building-details">
      <Skeleton loading={isLoading}>
        <BuildingDetailsTitle
          address={details?.address}
          streetNumber={details?.street_number}
          locality={details?.locality}
          countyCode={details?.county_code}
          onClose={onClose}
        />
        {detailsItems.length > 0 ? (
          <Descriptions column={1}>
            {detailsItems.map(({ label, value }) => (
              <Descriptions.Item key={label} label={label}>
                {value}
              </Descriptions.Item>
            ))}
          </Descriptions>
        ) : (
          <Row type="flex" align="middle" justify="space-around" style={{ height: '100%' }}>
            <Empty description={<Trans>Information missing</Trans>} />
          </Row>
        )}
        {/* <BuildingDetailsFooter /> */}
      </Skeleton>
    </Card>
  );
};

export default BuildingDetails;
