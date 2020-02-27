import React from 'react';

import MapMarker from './MapMarker';

const HereMapInteractive = props => {
  const { apikey, points } = props;
  const mapRef = React.useRef(null);
  const [currentMap, setCurrentMap] = React.useState(null);

  React.useLayoutEffect(() => {
    if (!mapRef.current) return;
    const { H } = window;
    const platform = new H.service.Platform({ apikey });
    const layer = platform.createDefaultLayers();

    const map = new H.Map(mapRef.current, layer.vector.normal.map, {
      center: { lat: 44.4268, lng: 26.1025 },
      zoom: 10,
    });

    const events = new H.mapevents.MapEvents(map);
    // eslint-disable-next-line no-unused-vars
    const behavior = new H.mapevents.Behavior(events);
    /* eslint-disable-next-line no-unused-vars, new-cap */
    const ui = new H.ui.UI.createDefault(map, layer);

    setCurrentMap(map);

    // eslint-disable-next-line consistent-return
    return () => map.dispose();
  }, [apikey, mapRef, points]);

  return (
    <div>
      {apikey ? (
        <div ref={mapRef} style={{ width: '100%', height: '400px', background: 'grey' }}>
          {points.map(p => (
            <MapMarker map={currentMap} poi={p} key={p.land_registry_number} />
          ))}
        </div>
      ) : (
        <h1>Here Maps API Key not set</h1>
      )}
    </div>
  );
};

export default HereMapInteractive;
