import React from 'react';
import { Row, Descriptions, Empty } from 'antd';
import { Trans } from '@lingui/macro';
import BuildingDetailsTitle from './BuildingDetailsTitle';
import BuildingDetailsFooter from './BuildingDetailsFooter';

const BuildingDetails = ({ onClose, details }) => {
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
    <Row className="building-details">
      {detailsItems.length > 0 ? (
        <>
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
            {detailsItems.map(({ label, value }) => (
              <Descriptions.Item key={label} label={label}>
                {value}
              </Descriptions.Item>
            ))}
          </Descriptions>
          <BuildingDetailsFooter />
        </>
      ) : (
        <Empty description={<Trans>Information missing</Trans>} />
      )}
    </Row>
  );
};

export default BuildingDetails;
