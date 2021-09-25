import React from 'react';
import BlogItem from '.';

const Template = (args) => <BlogItem {...args} />;

const blogItem = (
  <BlogItem
    postDetails={{
      image: 'https://picsum.photos/200/300',
      title: 'Blog title',
      author_first_name: 'First',
      author_last_name: 'Last',
      published: new Date(0),
      preview_text: 'Preview text',
    }}
  />
);
export const Default = Template.bind({});
Default.args = blogItem.props;

export default {
  title: 'BlogItem',
  component: BlogItem,
};
