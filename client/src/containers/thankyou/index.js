import React from 'react';
import Layout from '../../components/Layout';
import BlogPreviewFragment from './BlogPreviewFragment';
import HeroFragment from './HeroFragment';

export default () => (
  <Layout hero={<HeroFragment />}>
    <div className="add-building">
      <BlogPreviewFragment />
    </div>
  </Layout>
);
