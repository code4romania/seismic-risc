import React, { useState } from 'react';
import Layout from '../../components/Layout';
import BlogPost from './BlogPost';
import HeroFramgment from './HeroFragment';

export default () => {
  const [postDetails, setPostDetails] = useState({});

  const handlePostLoaded = (post) => {
    setPostDetails(post);
  };

  return (
    <Layout hero={<HeroFramgment postDetails={postDetails} />}>
      <BlogPost handlePostLoaded={handlePostLoaded} />
    </Layout>
  );
};
