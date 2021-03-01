import React, { useLayoutEffect, useRef, useState } from 'react';
import BuildingDetailsFragment from '../../containers/building/BuildingDetailsFragment';
import SearchResults from '../SearchResults';

import { useGlobalContext } from '../../context';
import useDecoratedClusteredMap from '../../hooks/map/useDecoratedClusteredMap';

const { H } = window;

const HereMapInteractive = (props) => {
  const { apikey, points } = props;

  const [currentMap, setCurrentMap] = useState(undefined);

  const mapRef = useRef(null);

  const { onHereMapLoaded } = useGlobalContext();

  const {
    isDrawerVisible,
    buildingDetails,
    onSelectBuilding,
    onHideBuilding,
  } = useDecoratedClusteredMap(currentMap, points);

  useLayoutEffect(() => {
    if (!mapRef.current) return;
    const platform = new H.service.Platform({ apikey });
    const layer = platform.createDefaultLayers();

    const map = new H.Map(mapRef.current, layer.vector.normal.map, {
      center: { lat: 44.4268, lng: 26.1025 },
      zoom: 10,
    });

    window.addEventListener('resize', () => map.getViewPort().resize());

    const events = new H.mapevents.MapEvents(map);
    // eslint-disable-next-line no-unused-vars
    const behavior = new H.mapevents.Behavior(events);
    /* eslint-disable-next-line no-unused-vars, new-cap */
    const ui = new H.ui.UI.createDefault(map, layer);

    setCurrentMap(map);
    onHereMapLoaded(map);

    // eslint-disable-next-line consistent-return
    return () => map.dispose();
  }, [apikey]);

  return (
    <div>
      {apikey && (
        <div
          className="map-container"
          ref={mapRef}
          style={{ width: '100%', height: '400px', background: 'grey' }}
        >
          <BuildingDetailsFragment
            visible={isDrawerVisible}
            onClose={onHideBuilding}
            incompleteDetails={buildingDetails}
          />
          <SearchResults onItemSelected={onSelectBuilding} />
        </div>
      )}
    </div>
  );
};

export default HereMapInteractive;
