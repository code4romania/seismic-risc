import React from 'react';
import SocialBar from '.';

const Template = (args) => <SocialBar {...args} />;

export const Default = Template.bind({});
Default.args = SocialBar.props;

export default {
  title: 'SocialBar',
  component: SocialBar,
};
