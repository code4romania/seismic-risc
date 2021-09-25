import React from 'react';
import BlogCard from './index';

const Template = (args) => <BlogCard {...args} />;

const blogCard = (
  <BlogCard title="Blog title" imageUrl="https://picsum.photos/200/300" slug="article" />
);
export const Default = Template.bind({});
Default.args = blogCard.props;

export default {
  title: 'BlogCard',
  component: BlogCard,
};
