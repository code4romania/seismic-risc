import React from 'react';
import SearchFragment from './SearchFragment';
import StatisticFragment from './StatisticFragment';
import MapFragment from './MapFragment';

export default ({ showTitle = true }) => {
  return (
    <div className="container">
      <SearchFragment showTitle={showTitle} />
      <MapFragment />
      <StatisticFragment />
    </div>
  );
};
