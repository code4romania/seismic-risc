import React from 'react';

// HereMaps Map Image API config documentation
// https://developer.here.com/documentation/map-image/dev_guide/topics/resource-map.html

const baseUrl = 'https://image.maps.ls.hereapi.com/mia/1.6/mapview';
const mapConfig = {
  // apiKey: "API_KEY_HERE",
  w: 1000,
  h: 300,
  // zoom level
  z: 10,
  // here maps rendering scheme ID
  t: 5,
  poitXs: 16,
  poitxc: 'black',
  poitfc: 'yellow',
  // Bucharest coordinates
  bbox: '44.4268,26.1025,44.4468,26.1225',
};

const getPOIs = points => {
  return points && points.length
    ? points.reduce(
        (accumulator, [latitude, longitude]) => `${accumulator}${latitude},${longitude},`,
        '&poi=',
      )
    : '';
};

export default props => {
  const imageUrl =
    Object.entries(mapConfig).reduce(
      (accumulator, [key, value]) => `${accumulator}&${key}=${value}`,
      `${baseUrl}?`,
    ) + getPOIs(props.points);

  return (
    <div>
      {mapConfig.apiKey ? (
        <img src={imageUrl} alt="Here Map" />
      ) : (
        <h1>Here Maps API Key not set</h1>
      )}
    </div>
  );
};
