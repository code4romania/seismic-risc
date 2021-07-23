import React from 'react';
import BlogPreview from '.';

const Template = (args) => <BlogPreview {...args} />;

const blogPreview = <BlogPreview title="Title" />;
export const Default = Template.bind({});
Default.args = blogPreview.props;

export default {
  title: 'BlogPreview',
  component: BlogPreview,
};
