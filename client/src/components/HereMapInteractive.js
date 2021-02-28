import React from 'react';
import BuildingDetails from './BuildingDetails';
import SearchResults from './SearchResults';

import { useGlobalContext } from '../context';

const { H } = window;

const HereMapInteractive = (props) => {
  const { onHereMapLoaded } = useGlobalContext();
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
    onHereMapLoaded(map);

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
        const svgMarkup = `<div class="marker-${poi.risk_category.toLowerCase()}"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle style="" cx="12.43" cy="8.37" r="8.107"/><path style="" transform="matrix(0.033909, 0.021505, -0.022542, 0.035546, 11.993942, -9.750627)" d="M 176 536 A 303.401 303.401 0 0 1 452 358.599 L 452 662 Z"/><text style="fill: rgb(255, 249, 249); font-size: 7.9px; white-space: pre; text-anchor: middle;" x="12" y="11.114">${poi.risk_category.toUpperCase()}</text></svg></div>`;
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
          <SearchResults />
        </div>
      ) : (
        <h1>Here Maps API Key not set</h1>
      )}
    </div>
  );
};

export default HereMapInteractive;
