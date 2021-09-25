import React from 'react';
import Layout from '../../components/Layout';
import FormFragment from './FormFragment';
import HeroFragment from './HeroFragment';

export default () => (
  <Layout hero={<HeroFragment />}>
    <div className="add-building">
      <FormFragment />
    </div>
  </Layout>
);
