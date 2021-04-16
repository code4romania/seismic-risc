import React from 'react';
import { Typography } from 'antd';
import { Trans } from '@lingui/macro';
import Layout from '../../components/Layout';

const { Title, Paragraph } = Typography;

export default () => (
  <Layout>
    <div className="add-building">
      <Title level={2} underline>
        <Trans>Thank you!</Trans>
      </Title>
      <Paragraph>
        <Trans id="thank-you-message">
          Thank you for the information that you sent us. In the following days someone from our
          team will evaluate the information sent to us and, as soon as we will have all the
          necessary data to add the building on the map, we will notify you.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>In the meantime, keep being awesome!</Trans>
      </Paragraph>
    </div>
  </Layout>
);
