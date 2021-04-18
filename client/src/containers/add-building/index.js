import React from 'react';
import { Typography } from 'antd';
import { Trans } from '@lingui/macro';
import Layout from '../../components/Layout';
import FormFragment from './FormFragment';

const { Title, Paragraph } = Typography;

export default () => (
  <Layout>
    <div className="add-building">
      <Title level={2} underline>
        <Trans>Add a building</Trans>
      </Title>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur doloremque dignissimos
        velit possimus dolorem natus quis quisquam iusto at dolore? Sint, id voluptatum. Minus
        repellat fugit dolorem tempora excepturi voluptates.
      </Paragraph>
      <FormFragment />
    </div>
  </Layout>
);
