import React from 'react';
import SearchResults from '../SearchResults';

const Template = (args) => <SearchResults {...args} />;

export const Default = Template.bind({});
Default.args = SearchResults.props;

export default {
  title: 'SearchResults',
  component: SearchResults,
  argTypes: { onItemSelected: { action: 'clicked' } },
};
