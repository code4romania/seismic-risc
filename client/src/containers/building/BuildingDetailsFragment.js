import React, { useState } from 'react';
import BuildingDetails from '../../components/BuildingDetails';

import config from '../../config';

const { BUILDINGS_URL } = config;

export default (props) => {
  const { visible, onClose, incompleteDetails } = props;
  const [completeDetails, setCompleteDetails] = useState(undefined);

  React.useEffect(() => {
    if (incompleteDetails == null) return;
    if (completeDetails?.general_id !== incompleteDetails?.general_id) {
      setCompleteDetails({});
      const buildingURL = `${BUILDINGS_URL}/${incompleteDetails.general_id}`;
      fetch(buildingURL)
        .then((res) => res.json())
        .then((details) => {
          setCompleteDetails(details);
        })
        .catch(() => {
          setCompleteDetails(undefined);
        });
    }
  }, [incompleteDetails]);

  return <BuildingDetails visible={visible} onClose={onClose} details={completeDetails} />;
};
