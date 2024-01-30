import React from 'react';
import { Col } from 'antd';
import BlogCard from './index';

export default {
  title: 'BlogCard',
  component: BlogCard,
};

const Template = (args) => <BlogCard {...args} />;

const blogCard = (
  <BlogCard title="Blog title" imageUrl="https://picsum.photos/200/300" slug="article" />
);
export const Default = Template.bind({});
Default.args = blogCard.props;

export const BlogCardWithBorder = Template.bind({});
BlogCardWithBorder.args = { ...Default.args, cardIndex: 0 };

export const BlogCardFixedWidth = Template.bind({});
BlogCardFixedWidth.args = { ...BlogCardWithBorder.args };
BlogCardFixedWidth.decorators = [
  (Story) => (
    <Col lg={8} span={24}>
      <Story />
    </Col>
  ),
];

export const BlogCardWithLongTitle = Template.bind({});
BlogCardWithLongTitle.args = {
  ...BlogCardFixedWidth.args,
  title: 'Blog Card with Veeeeeeryyyyyy Loooooooong Title',
};
BlogCardWithLongTitle.decorators = [...BlogCardFixedWidth.decorators];
