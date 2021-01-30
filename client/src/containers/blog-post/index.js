import React from 'react';
import Layout from '../../components/Layout';
import BlogPost from './BlogPost';

export default ({ language, languageChangeCallback }) => (
  <Layout language={language} languageChangeCallback={languageChangeCallback}>
    <BlogPost />
  </Layout>
);
