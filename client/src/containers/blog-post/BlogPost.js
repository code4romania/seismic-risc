import React from 'react';
import BlogPostDetailsFragment from './BlogPostDetailsFragment/BlogPostDetailsFragment';

const BlogPost = ({ handlePostLoaded }) => {
  return <BlogPostDetailsFragment handlePostLoaded={handlePostLoaded} />;
};

export default BlogPost;
