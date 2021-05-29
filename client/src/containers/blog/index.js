import React from 'react';
import Layout from '../../components/Layout';
import Blog from './Blog';
import HeroFragment from './HeroFragment';

export default () => (
  <Layout hero={<HeroFragment />}>
    <Blog />
  </Layout>
);
