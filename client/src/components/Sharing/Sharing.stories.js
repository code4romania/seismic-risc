import React from 'react';
import Sharing from '.';

const Template = (args) => <Sharing {...args} />;

export const Default = Template.bind({});
Default.args = Sharing.props;

export default {
  title: 'Sharing',
  component: Sharing,
};
