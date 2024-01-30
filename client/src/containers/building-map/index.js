import React from 'react';
import SearchFragment from './SearchFragment';
import MapFragment from './MapFragment';

export default ({ showTitle = true }) => {
  return (
    <div className="container">
      <SearchFragment showTitle={showTitle} />
      <MapFragment />
    </div>
  );
};
