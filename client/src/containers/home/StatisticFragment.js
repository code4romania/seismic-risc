import React from 'react';
import { Row, Col, Card } from 'antd';
import { Trans } from '@lingui/react';

import config from '../../config';

const { STATISTICS_URL } = config;

const StatisticCard = ({ children, value }) => (
  <Card style={{ border: 'none', backgroundColor: '#ee741b' }}>
    <div>
      <h1 style={{ color: 'white' }}>{value}</h1>
      <h3 style={{ color: 'white' }}>{children}</h3>
    </div>
  </Card>
);

export default () => {
  const [state, setState] = React.useState({
    statistics: {
      people_under_risk: '',
      evaluated_buildings: '',
      consolidated_buildings: '',
    },
  });
  React.useEffect(() => {
    fetch(STATISTICS_URL)
      .then((res) => res.json())
      .then((statistics) => {
        setState((prevState) => ({
          ...prevState,
          statistics,
        }));
      });
  }, []);

  return (
    <Row
      gutter={[0, { xs: 20, sm: 20, md: 0 }]}
      justify="space-around"
      type="flex"
      style={{ marginTop: '1rem' }}
    >
      <Col xs={24} md={8}>
        <StatisticCard value={state.statistics.people_under_risk}>
          <Trans id="People under risk" />
        </StatisticCard>
      </Col>
      <Col xs={24} md={7}>
        <StatisticCard value={state.statistics.evaluated_buildings}>
          <Trans id="Evaluated buildings" />
        </StatisticCard>
      </Col>
      <Col xs={24} md={8}>
        <StatisticCard value={state.statistics.consolidated_buildings}>
          <Trans id="Consolidated buildings" />
        </StatisticCard>
      </Col>
    </Row>
  );
};
