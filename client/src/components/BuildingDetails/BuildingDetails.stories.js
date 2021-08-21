import React from 'react';
import BuildingDetails from '.';

const Template = (args) => <BuildingDetails {...args} />;

const buildingDetails = (
  <BuildingDetails
    isLoading={false}
    details={{
      address: 'Bucuresti, Sector 6, Str. Dambovita',
      street_number: '10',
      year_built: '2001',
      height_regime: 'U2',
      risk_category: 'A',
      examination_year: '2002',
      certified_expert: 'Ion Iliescu',
    }}
  />
);
export const Default = Template.bind({});
Default.args = buildingDetails.props;

export default {
  title: 'BuildingDetails',
  component: BuildingDetails,
  argTypes: { onClose: { action: 'clicked' } },
};
