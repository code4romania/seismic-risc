import React from 'react';
import LoadMoreArticlesLink from '.';

const Template = (args) => <LoadMoreArticlesLink {...args} />;

const loadMoreArticlesLink = <LoadMoreArticlesLink disabled={false} />;
export const Default = Template.bind({});
Default.args = loadMoreArticlesLink.props;

export default {
  title: 'LoadMoreArticlesLink',
  component: LoadMoreArticlesLink,
  argTypes: { onClick: { action: 'clicked' } },
};
