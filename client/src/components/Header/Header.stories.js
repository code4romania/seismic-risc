import React from 'react';
import Header from '.';

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = Header.props;

export default {
  title: 'Header',
  component: Header,
};
