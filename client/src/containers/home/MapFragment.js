import React from 'react';
import { Tabs } from 'antd';
import HereMapInteractive from '../../components/HereMapInteractive';

const { TabPane } = Tabs;

const API_KEY = ''; // apikey to be set
const URL = 'http://localhost:3001/buildings';

export default () => {
  const [dummyPoints, setDummyPoints] = React.useState([]);
  React.useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(points => {
        setDummyPoints(points.map(poi => poi.fields));
      });
  }, []);

  return (
    <Tabs size="large" animated={false} defaultActiveKey="1" onChange={null}>
      <TabPane tab="Toate clădirile cu risc seismic" key="all">
        <HereMapInteractive apikey={API_KEY} points={dummyPoints} />
      </TabPane>
      <TabPane tab="Clasa U1 de risc seismic" key="classU1">
        <HereMapInteractive
          apikey={API_KEY}
          points={dummyPoints.filter(poi => {
            return poi.risk_category === 'U1' || poi.risk_category === 'RS I';
          })}
        />
      </TabPane>
      <TabPane tab="Clasa U2 de risc seismic" key="classU2">
        <HereMapInteractive
          apikey={API_KEY}
          points={dummyPoints.filter(poi => {
            return poi.risk_category === 'U2' || poi.risk_category === 'RS II';
          })}
        />
      </TabPane>
      <TabPane tab="Clasa U3 de risc seismic" key="classU3">
        <HereMapInteractive
          apikey={API_KEY}
          points={dummyPoints.filter(poi => {
            return poi.risk_category === 'U3' || poi.risk_category === 'RS III';
          })}
        />
      </TabPane>
    </Tabs>
  );
};
