import React from 'react';
import HereMapDomIconFactory from '.';

const Template = (args) => <HereMapDomIconFactory {...args} />;

export const Default = Template.bind({});
Default.args = HereMapDomIconFactory.props;

export default {
  title: 'HereMapDomIconFactory',
  component: HereMapDomIconFactory,
};
