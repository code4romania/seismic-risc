import React from 'react';
import FormSubSection from './index';

export default {
  title: 'FormSubSection',
  component: FormSubSection,
};

const Template = (args) => <FormSubSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'A',
  title: 'Form sub-section title',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus id id ut aenean nunc.',
  children: (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus id id ut aenean nunc. Lorem
      ipsum dolor sit amet, consectetur adipiscing elit. Purus id id ut aenean nunc.Lorem ipsum
      dolor sit amet, consectetur adipiscing elit. Purus id id ut aenean nunc.
    </div>
  ),
};

export const LongTitle = Template.bind({});
LongTitle.args = {
  ...Default.args,
  title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus id id ut aenean nunc.',
};

export const LongDescription = Template.bind({});
LongDescription.args = {
  ...Default.args,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus id id ut aenean nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus id id ut aenean nunc.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus id id ut aenean nunc.',
};
