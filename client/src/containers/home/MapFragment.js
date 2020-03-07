import React from 'react';
import { Tabs } from 'antd';
import HereMapInteractive from '../../components/HereMapInteractive';

const { TabPane } = Tabs;

const dummyPoints = [
  {
    general_id: 75,
    risk_category: 'U1',
    lat: 44.34556,
    lng: 26.206,
  },
  {
    general_id: 74,
    risk_category: 'U3',
    lat: 44.43556,
    lng: 26.106984,
  },
  {
    general_id: 73,
    risk_category: 'N/A',
    lat: 44.39556,
    lng: 26.156,
  },
  {
    general_id: 72,
    risk_category: 'RS I',
    lat: 44.42556,
    lng: 26.176,
  },
  {
    general_id: 71,
    risk_category: 'RS II',
    lat: 44.40553,
    lng: 26.186,
  },
  {
    general_id: 70,
    risk_category: 'RS III',
    lat: 44.41339,
    lng: 26.146,
  },
];

export default () => {
  return (
    <Tabs size="large" animated={false} defaultActiveKey="1" onChange={null}>
      <TabPane tab="Toate clădirile cu risc seismic" key="all">
        {/* apikey to be set */}
        <HereMapInteractive apikey="" points={dummyPoints} />
      </TabPane>
      <TabPane tab="Clasa U1 de risc seismic" key="classU1">
        {/* apikey to be set */}
        <HereMapInteractive
          apikey=""
          points={dummyPoints.filter(poi => {
            return poi.risk_category === 'U1' || poi.risk_category === 'RS I';
          })}
        />
      </TabPane>
      <TabPane tab="Clasa U2 de risc seismic" key="classU2">
        {/* apikey to be set */}
        <HereMapInteractive
          apikey=""
          points={dummyPoints.filter(poi => {
            return poi.risk_category === 'U2' || poi.risk_category === 'RS II';
          })}
        />
      </TabPane>
      <TabPane tab="Clasa U3 de risc seismic" key="classU3">
        {/* apikey to be set */}
        <HereMapInteractive
          apikey=""
          points={dummyPoints.filter(poi => {
            return poi.risk_category === 'U3' || poi.risk_category === 'RS III';
          })}
        />
      </TabPane>
    </Tabs>
  );
};
