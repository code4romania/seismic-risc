import React from 'react';
import { Tabs } from 'antd';
import { Trans } from '@lingui/macro';
import HereMapInteractive from '../../components/HereMapInteractive';
import { useGlobalContext } from '../../context';

import config from '../../config';

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

  const tabItems = [
    {
      key: 'all',
      label: <Trans>All seismic risk classes</Trans>,
    },
    {
      key: 'RS1',
      label: 'RS1',
    },
    {
      key: 'RS2',
      label: 'RS2',
    },
    {
      key: 'RS3',
      label: 'RS3',
    },
    {
      key: 'RS4',
      label: 'RS4',
    },
    {
      key: 'NA',
      label: <Trans>Unassigned</Trans>,
    },
  ];

  const categoryItems = [
    {
      key: 'U1',
      label: 'U1',
    },
    {
      key: 'U2',
      label: 'U2',
    },
    {
      key: 'U3',
      label: 'U3',
    },
    {
      key: 'U4',
      label: 'U4',
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Tabs
          size="large"
          animated={false}
          defaultActiveKey="1"
          onChange={onChange}
          items={tabItems}
        />
        <div style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.6)', margin: '0 12px', height: 40 }} />
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, paddingRight: 16 }}>
          <Trans>Emergency categories</Trans>
        </div>

        <Tabs size="large" animated={false} onChange={onchange} items={categoryItems} />
      </div>
      <HereMapInteractive points={state.filteredPoints || state.initialPoints} />
    </div>
  );
};
