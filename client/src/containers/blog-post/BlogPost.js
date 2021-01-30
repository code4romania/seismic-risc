import React from 'react';
import Layout from '../../components/Layout';
import BlogPostDetailsFragment from './BlogPostDetailsFragment/BlogPostDetailsFragment';

const BlogPost = ({ language, languageChangeCallback }) => {
  return (
    <Layout language={language} languageChangeCallback={languageChangeCallback}>
      <BlogPostDetailsFragment />
    </Layout>
  );
};

export default BlogPost;
