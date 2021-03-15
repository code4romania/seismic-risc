import React from 'react';
import Layout from '../../components/Layout';

import MapFragment from './MapFragment';
import ParagraphFragment from './ParagraphFragment';
import SearchFragment from './SearchFragment';
import StatisticFragment from './StatisticFragment';
import BlogPreviewFragment from './BlogPreviewFragment';

export default () => (
  <Layout>
    <SearchFragment />
    <MapFragment />
    <StatisticFragment />
    <ParagraphFragment />
    <BlogPreviewFragment />
  </Layout>
);
