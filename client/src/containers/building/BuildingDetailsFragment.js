import React, { useState } from 'react';
import BuildingDetails from '../../components/BuildingDetails';

import config from '../../config';

const { BUILDINGS_URL } = config;

export default (props) => {
  const { onClose, incompleteDetails } = props;
  const [completeDetails, setCompleteDetails] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (incompleteDetails == null) return;
    if (completeDetails?.general_id !== incompleteDetails?.general_id) {
      const buildingURL = `${BUILDINGS_URL}/${incompleteDetails.general_id}`;
      const fetchData = async () => {
        setIsLoading(true);
        setCompleteDetails(null);
        const res = await fetch(buildingURL);
        const data = await res.json();
        setCompleteDetails(data);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [incompleteDetails]);

  return <BuildingDetails onClose={onClose} details={completeDetails} isLoading={isLoading} />;
};
