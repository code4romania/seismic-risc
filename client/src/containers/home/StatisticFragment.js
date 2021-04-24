import React from 'react';
import { Row, Col, Card } from 'antd';
import { Trans } from '@lingui/macro';

import { ReactComponent as PeopleRisk } from '../../images/user-solid.svg';
import { ReactComponent as EvaluatedBuildings } from '../../images/home-solid.svg';
import { ReactComponent as ConsolidatedBuildings } from '../../images/house-damage-solid.svg';

import config from '../../config';

const { STATISTICS_URL } = config;

const StatisticCard = ({ title, value, icon }) => (
  <Card style={{ border: 'none', backgroundColor: '#ee741b', color: 'white' }} size="small">
    <Row type="flex" justify="space-between" align="middle">
      <Col span={4}>{icon}</Col>
      <Col span={18} style={{ textAlign: 'left' }}>
        {value > 0 ? (
          <>
            <h3 style={{ color: '#fff' }}>{value}</h3>
            <h4 style={{ color: '#fff' }}>{title}</h4>
          </>
        ) : (
          <>
            <h3 style={{ color: '#fff' }}>{title}</h3>
            <h4 style={{ color: '#fff' }}>
              <Trans>Information being updated</Trans>
            </h4>
          </>
        )}
      </Col>
    </Row>
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
      gutter={[
        { xs: 0, md: 20 },
        { xs: 20, sm: 20, md: 0 },
      ]}
      justify="space-around"
      type="flex"
      style={{ marginTop: '1rem' }}
    >
      <Col xs={24} md={8}>
        <StatisticCard
          title={<Trans>People under risk</Trans>}
          value={state.statistics.people_under_risk}
          icon={<PeopleRisk style={{ width: '38px', height: '38px' }} />}
        />
      </Col>
      <Col xs={24} md={8}>
        <StatisticCard
          title={<Trans>Evaluated buildings</Trans>}
          value={state.statistics.evaluated_buildings}
          icon={<EvaluatedBuildings style={{ width: '38px', height: '38px' }} />}
        />
      </Col>
      <Col xs={24} md={8}>
        <StatisticCard
          title={<Trans>Consolidated buildings</Trans>}
          value={state.statistics.consolidated_buildings}
          icon={<ConsolidatedBuildings style={{ width: '38px', height: '38px' }} />}
        />
      </Col>
    </Row>
  );
};
