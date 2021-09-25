import React from 'react';
import Hero from '.';

const Template = (args) => <Hero {...args} />;

export const Default = Template.bind({});
Default.args = Hero.props;

export default {
  title: 'Hero',
  component: Hero,
};
