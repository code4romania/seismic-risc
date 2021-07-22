import React from 'react';
import Footer from '../Footer';

const Template = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = Footer.props;

export default {
  title: 'Footer',
  component: Footer,
};
