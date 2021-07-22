import React from 'react';
import HereMapInteractive from '.';

const Template = (args) => <HereMapInteractive {...args} />;

export const Default = Template.bind({});
Default.args = HereMapInteractive.props;

export default {
  title: 'HereMapInteractive',
  component: HereMapInteractive,
};
