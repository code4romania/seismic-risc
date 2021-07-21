import React from 'react';
import Layout from '../../components/Layout';

import MapFragment from './MapFragment';
import ParagraphFragment from './ParagraphFragment';
import SearchFragment from './SearchFragment';
import StatisticFragment from './StatisticFragment';
import BlogPreviewFragment from './BlogPreviewFragment';
import HeroFragment from './HeroFragment';

export default () => (
  <Layout hero={<HeroFragment />}>
    <SearchFragment />
    <MapFragment />
    <StatisticFragment />
    <ParagraphFragment />
    <BlogPreviewFragment />
  </Layout>
);
