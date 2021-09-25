import React from 'react';
import Layout from '../../components/Layout';
import HeroFragment from './HeroFragment';
import BlogPreviewFragment from './BlogPreviewFragment';

const NotFound = () => {
  return (
    <Layout hero={<HeroFragment />}>
      <BlogPreviewFragment />
    </Layout>
  );
};
export default NotFound;
