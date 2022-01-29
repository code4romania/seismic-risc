import React from 'react';
import { Tabs } from 'antd';
import { Trans } from '@lingui/macro';
import HereMapInteractive from '../../components/HereMapInteractive';
import { useGlobalContext } from '../../context';

import config from '../../config';

const { TabPane } = Tabs;

const { BUILDINGS_URL } = config;

export default () => {
  const [state, setState] = React.useState({
    initialPoints: [],
    filteredPoints: null,
  });

  const { onCategoryChange } = useGlobalContext();

  React.useEffect(() => {
    fetch(`${BUILDINGS_URL}/`)
      .then((res) => res.json())
      .then((points) => {
        setState((prevState) => ({
          ...prevState,
          initialPoints: points,
        }));
      })
      .catch(() => {
        setState((prevState) => ({
          ...prevState,
          initialPoints: [],
        }));
      });
  }, []);

  const onChange = (e) => {
    const { initialPoints } = state;
    setState({
      ...state,
      filteredPoints:
        e === 'all'
          ? initialPoints
          : initialPoints.filter((poi) => {
              return poi.risk_category.toLowerCase() === e.toLowerCase();
            }),
    });
    if (e === 'all') {
      onCategoryChange('');
    } else {
      onCategoryChange(e);
    }
  };

  return (
    <div>
      <Tabs size="large" animated={false} defaultActiveKey="1" onChange={onChange}>
        <TabPane tab={<Trans>All seismic risk classes</Trans>} key="all" />
        <TabPane tab="U1" key="U1" />
        <TabPane tab="U2" key="U2" />
        <TabPane tab="U3" key="U3" />
        <TabPane tab="U4" key="U4" />
        <TabPane tab="RS1" key="RS1" />
        <TabPane tab="RS2" key="RS2" />
        <TabPane tab="RS3" key="RS3" />
        <TabPane tab="RS4" key="RS4" />
        <TabPane tab={<Trans>Other</Trans>} key="n/a" />
      </Tabs>
      <HereMapInteractive points={state.filteredPoints || state.initialPoints} />
    </div>
  );
};
