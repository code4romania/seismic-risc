import React from 'react';
import MapPlaceholder from '.';

const Template = (args) => <MapPlaceholder {...args} />;

export const Default = Template.bind({});
Default.args = MapPlaceholder.props;

export default {
  title: 'MapPlaceholder',
  component: MapPlaceholder,
};
