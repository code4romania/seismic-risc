import { Trans } from '@lingui/macro';
import { Empty, Spin, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

const MapPlaceholder = () => (
  <Empty
    image={<Spin size="large" />}
    imageStyle={{ height: 'auto' }}
    description={
      <Text>
        <Trans>Map loading…</Trans>
      </Text>
    }
    style={{
      position: 'absolute',
      zIndex: 99,
      backgroundColor: 'white',
      height: '100%',
      left: 0,
      margin: '0 15px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      right: 0,
      borderRadius: '10px',
    }}
  />
);

export default MapPlaceholder;
