import React from 'react';
import BuildingDetails from '../../components/BuildingDetails';

import config from '../../config';

const { BUILDINGS_URL } = config;

export default (props) => {
  const { visible, onClose, incompleteDetails } = props;
  const [state, setState] = React.useState({
    completeDetails: {},
  });

  React.useEffect(() => {
    if (incompleteDetails == null) return;

    const buildingURL = `${BUILDINGS_URL}/${incompleteDetails.general_id}`;

    fetch(buildingURL)
      .then((res) => res.json())
      .then((details) => {
        setState(() => ({
          completeDetails: details,
        }));
      })
      .catch(() => {});
  }, [incompleteDetails]);

  return <BuildingDetails visible={visible} onClose={onClose} details={state.completeDetails} />;
};
