import React from 'react';
import { Row, Col, Card } from 'antd';
import { Trans } from '@lingui/macro';

import { ReactComponent as PeopleRisk } from '../../images/user-solid.svg';
import { ReactComponent as EvaluatedBuildings } from '../../images/house-damage-solid.svg';
import { ReactComponent as ConsolidatedBuildings } from '../../images/wrench-solid.svg';
import { ReactComponent as StatsIconBackground } from '../../images/stats-icon-background.svg';

import config from '../../config';

const { STATISTICS_URL } = config;

const StatisticCard = ({ title, value, icon, type = '' }) => (
  <Card className={`stats-card ${type}`} size="small">
    {value > 0 ? (
      <>
        <h3 className="stats-heading">{value}</h3>
        <h4>{title}</h4>
      </>
    ) : (
      <>
        <h3 className="stats-heading">{title}</h3>
        <h4>
          <Trans>Information being updated</Trans>
        </h4>
      </>
    )}
    <StatsIconBackground className={`stats-background ${type}`} />
    <div className="stats-icon">{icon}</div>
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
    fetch(`${STATISTICS_URL}/`)
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
          icon={<PeopleRisk />}
          type="people-under-risk"
        />
      </Col>
      <Col xs={24} md={8}>
        <StatisticCard
          title={<Trans>Evaluated buildings</Trans>}
          value={state.statistics.evaluated_buildings}
          icon={<EvaluatedBuildings />}
          type="evaluated-buildings"
        />
      </Col>
      <Col xs={24} md={8}>
        <StatisticCard
          title={<Trans>Consolidated buildings</Trans>}
          value={state.statistics.consolidated_buildings}
          icon={<ConsolidatedBuildings />}
          type="consolidated-buildings"
        />
      </Col>
    </Row>
  );
};
