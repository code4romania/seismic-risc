import React from 'react';
import UploadButton from './index';

export default {
  title: 'UploadButton',
  componet: UploadButton,
};

const Template = (args) => <UploadButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Upload one or more photographs',
};
