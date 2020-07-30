import React from 'react';
import { Tabs } from 'antd';
import HereMapInteractive from '../../components/HereMapInteractive';

const { TabPane } = Tabs;

const MAP_API_KEY = process.env.REACT_APP_API_KEY;
const URL = 'http://localhost:3001/buildings';

export default () => {
  const [state, setState] = React.useState({
    initialPoints: [],
    filteredPoints: null,
  });
  React.useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((points) => {
        setState((prevState) => ({
          ...prevState,
          initialPoints: points.map((poi) => poi.fields),
        }));
      });
  }, []);

  const onChange = (e) => {
    const { initialPoints } = state;
    switch (e) {
      case 'classU1':
        setState({
          ...state,
          filteredPoints: initialPoints.filter((poi) => {
            return poi.risk_category === 'U1' || poi.risk_category === 'RS I';
          }),
        });
        break;
      case 'classU2':
        setState({
          ...state,
          filteredPoints: initialPoints.filter((poi) => {
            return poi.risk_category === 'U2' || poi.risk_category === 'RS II';
          }),
        });
        break;
      case 'classU3':
        setState({
          ...state,
          filteredPoints: initialPoints.filter((poi) => {
            return poi.risk_category === 'U3' || poi.risk_category === 'RS III';
          }),
        });
        break;
      default:
        setState({ ...state, filteredPoints: initialPoints });
        break;
    }
  };

  return (
    <div>
      <Tabs size="large" animated={false} defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Toate clădirile cu risc seismic" key="all" />
        <TabPane tab="Clasa U1 de risc seismic" key="classU1" />
        <TabPane tab="Clasa U2 de risc seismic" key="classU2" />
        <TabPane tab="Clasa U3 de risc seismic" key="classU3" />
      </Tabs>
      <HereMapInteractive
        apikey={MAP_API_KEY}
        points={state.filteredPoints || state.initialPoints}
      />
    </div>
  );
};
