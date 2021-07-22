import React from 'react';
import Sharing from '../Sharing';

const Template = (args) => <Sharing {...args} />;

export const Default = Template.bind({});
Default.args = Sharing.props;

export default {
  title: 'Sharing',
  component: Sharing,
};
