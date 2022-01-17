import React from 'react';
import Chip from './index';

export default {
  component: Chip,
  title: 'Chip',
  decorators: [
    (story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {story()}
      </div>
    ),
  ],
};

const Template = (args) => <Chip {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 1,
};

export const SizeSmall = Template.bind({});
SizeSmall.args = {
  label: 2,
  size: 'small',
};

export const LongLabel = Template.bind({});
LongLabel.args = {
  label: 'Looooooooooooooooooooooooong label',
};
