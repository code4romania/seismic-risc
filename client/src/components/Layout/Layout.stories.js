import React from 'react';
import Layout from '../Layout';

const Template = (args) => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = Layout.props;

export default {
  title: 'Layout',
  component: Layout,
};
