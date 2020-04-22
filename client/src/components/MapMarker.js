import React from 'react';
import './marker.css';

const handleClick = (poi, map) => {
  map.getViewModel().setLookAtData({ position: poi.b, zoom: 17 }, true);
};

export default props => {
  const { map, poi } = props;
  React.useEffect(() => {
    if (map) {
      const { H } = window;
      const svgMarkup =
        '<div class="marker"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/><path d="M0 0h24v24H0z" fill="none"/></svg></div>';

      const icon = new H.map.DomIcon(svgMarkup);
      const marker = new H.map.DomMarker({ lat: poi.lat, lng: poi.lng }, { icon });

      marker.addEventListener('tap', event => handleClick(event.currentTarget, map));

      map.addObject(marker);
    }
  });
  return null;
};
