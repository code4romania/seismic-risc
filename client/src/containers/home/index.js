import React from 'react';
import Layout from '../../components/Layout';

import MapFragment from './MapFragment';
import ParagraphFragment from './ParagraphFragment';
import SearchFragment from './SearchFragment';
import StatisticFragment from './StatisticFragment';

export default () => (
  <Layout>
    <SearchFragment />
    <MapFragment />
    <StatisticFragment />
    <ParagraphFragment />
  </Layout>
);
