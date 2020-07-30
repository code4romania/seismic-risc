import React from 'react';
import BuildingDetails from './BuildingDetails';

const { H } = window;

const HereMapInteractive = (props) => {
  const { apikey, points } = props;
  const mapRef = React.useRef(null);
  const pointsRef = React.useRef();
  const [state, setState] = React.useState({
    currentMap: null,
    isDrawerVisible: false,
    buildingDetails: null,
  });

  React.useLayoutEffect(() => {
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

    setState((prevState) => ({ ...prevState, currentMap: map }));

    // eslint-disable-next-line consistent-return
    return () => map.dispose();
  }, [apikey]);

  React.useEffect(() => {
    const { currentMap, isDrawerVisible } = state;
    const handleMarkerClick = (marker, buildingDetails) => {
      const position = { ...marker.getGeometry() };
      position.lng += 0.006;
      currentMap.getViewModel().setLookAtData({ position, zoom: 15 }, true);
      if (!isDrawerVisible) {
        setState({ ...state, isDrawerVisible: true, buildingDetails });
      } else {
        setState({ ...state, buildingDetails });
      }
    };
    if (currentMap && pointsRef.current !== points) {
      pointsRef.current = points;
      setState({ ...state, isDrawerVisible: false });
      currentMap.removeObjects(currentMap.getObjects(true));
      if (points.length > 1) {
        const latitudes = points.map((p) => p.lat);
        const longitudes = points.map((p) => p.lng);
        const bounds = new H.geo.Rect(
          Math.max(...latitudes),
          Math.min(...longitudes),
          Math.min(...latitudes),
          Math.max(...longitudes),
        );
        currentMap.getViewModel().setLookAtData({ bounds, zoom: 10 }, true);
      } else {
        currentMap.getViewModel().setLookAtData({ zoom: 10 }, true);
      }

      points.forEach((poi) => {
        const svgMarkup =
          '<div class="marker"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/><path d="M0 0h24v24H0z" fill="none"/></svg></div>';

        const icon = new H.map.DomIcon(svgMarkup);
        const marker = new H.map.DomMarker({ lat: poi.lat, lng: poi.lng }, { icon });

        marker.addEventListener('tap', (event) => handleMarkerClick(event.currentTarget, poi));

        currentMap.addObject(marker);
      });
    }
  }, [state, points]);

  return (
    <div>
      {apikey ? (
        <div
          className="map-container"
          ref={mapRef}
          style={{ width: '100%', height: '400px', background: 'grey' }}
        >
          <BuildingDetails
            visible={state.isDrawerVisible}
            onClose={() => setState({ ...state, isDrawerVisible: false })}
            details={state.buildingDetails}
          />
        </div>
      ) : (
        <h1>Here Maps API Key not set</h1>
      )}
    </div>
  );
};

export default HereMapInteractive;
