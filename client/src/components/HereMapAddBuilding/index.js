import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import HereMapDomIconFactory from '../HereMapDomIconFactory';

const { H } = window;

const HereMapAddBuilding = (props) => {
  const { apiKey, searchText, onCoordinatesChange } = props;

  const mapRef = useRef(null);
  const [currentMap, setCurrentMap] = useState(undefined);
  const [currentPlatform, setCurrentPlatform] = useState(undefined);

  const clearMap = () => {
    currentMap.removeObjects(currentMap.getObjects());
  };

  const onSuccess = (result) => {
    if (currentMap && result.items.length > 0) {
      const { position } = result.items[0];
      const icon = HereMapDomIconFactory.makeMarkerIcon();
      const marker = new H.map.DomMarker(position, {
        volatility: true,
        icon,
      });
      marker.draggable = true;
      onCoordinatesChange(position);
      clearMap();
      currentMap.addObject(marker);
      currentMap.getViewModel().setLookAtData(
        {
          position,
          zoom: 16,
        },
        true,
      );
    }
  };

  const geocode = () => {
    if (!currentPlatform) {
      return;
    }
    const geocoder = currentPlatform.getSearchService();
    const geocodingParameters = {
      q: searchText,
    };
    geocoder.geocode(geocodingParameters, onSuccess);
  };

  useEffect(() => {
    if (searchText) {
      geocode(searchText);
    }
  }, [searchText]);

  useLayoutEffect(() => {
    if (!mapRef.current) return;
    const platform = new H.service.Platform({ apiKey });
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

    map.addEventListener(
      'dragstart',
      (ev) => {
        const { target, currentPointer } = ev;
        if (target instanceof H.map.DomMarker) {
          const targetPosition = map.geoToScreen(target.getGeometry());
          target.offset = new H.math.Point(
            currentPointer.viewportX - targetPosition.x,
            currentPointer.viewportY - targetPosition.y,
          );
          behavior.disable();
        }
      },
      false,
    );

    map.addEventListener(
      'dragend',
      (ev) => {
        const { target } = ev;
        if (target instanceof H.map.DomMarker) {
          behavior.enable();
          const coord = map.screenToGeo(ev.currentPointer.viewportX, ev.currentPointer.viewportY);
          const coordinate = {
            lat: Math.abs(coord.lat.toFixed(4)),
            lng: Math.abs(coord.lng.toFixed(4)),
          };
          onCoordinatesChange(coordinate);
        }
      },
      false,
    );

    map.addEventListener(
      'drag',
      (ev) => {
        const { target, currentPointer } = ev;

        if (target instanceof H.map.DomMarker) {
          target.setGeometry(
            map.screenToGeo(
              currentPointer.viewportX - target.offset.x,
              currentPointer.viewportY - target.offset.y,
            ),
          );
        }
      },
      false,
    );

    window.addEventListener('resize', () => map.getViewPort().resize());

    setCurrentMap(map);
    setCurrentPlatform(platform);

    // eslint-disable-next-line consistent-return
    return () => map.dispose();
  }, [apiKey]);

  return apiKey ? (
    <div
      className="map-container"
      ref={mapRef}
      style={{ width: '100%', height: '400px', background: 'grey' }}
    />
  ) : null;
};

export default HereMapAddBuilding;
