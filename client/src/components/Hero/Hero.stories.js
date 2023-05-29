import React from 'react';
import heroImage from '../../images/home_hero.png';
import Hero from '.';

const Template = (args) => <Hero {...args} heroImage={heroImage} title="Title" />;

export const Default = Template.bind({});
Default.args = Hero.props;

export default {
  title: 'Hero',
  component: Hero,
};
