import React from 'react';
import LinkButton from '.';

const Template = (args) => <LinkButton {...args} />;

const linkButton = <LinkButton to="/url">Button text</LinkButton>;
export const Default = Template.bind({});
Default.args = linkButton.props;

export default {
  title: 'LinkButton',
  component: LinkButton,
};
