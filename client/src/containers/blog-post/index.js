import React, { useState } from 'react';
import Layout from '../../components/Layout';
import BlogPost from './BlogPost';
import BlogPreviewFragment from './BlogPreviewFragment';
import HeroFramgment from './HeroFragment';

export default () => {
  const [postDetails, setPostDetails] = useState({});

  return (
    <Layout hero={<HeroFramgment postDetails={postDetails} />}>
      <BlogPost handlePostLoaded={setPostDetails} />
      <BlogPreviewFragment postSlug={postDetails.slug} />
    </Layout>
  );
};
