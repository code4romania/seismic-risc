import React from 'react';
import HereMapAddBuilding from './HereMapAddBuilding';

const Template = (args) => <HereMapAddBuilding {...args} />;

const hereMapAddBuilding = (
  <HereMapAddBuilding apiKey="wgG9TXsYKMDNTtr3lCyZ6csPsjFWYQC7wRWebebyGZQ" searchText="" />
);
export const Default = Template.bind({});
Default.args = hereMapAddBuilding.props;

export default {
  title: 'HereMapAddBuilding',
  component: HereMapAddBuilding,
};
