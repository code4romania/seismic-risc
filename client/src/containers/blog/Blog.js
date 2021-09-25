import React, { useEffect, useState, useCallback } from 'react';
import { Spin, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import BlogItem from '../../components/BlogItem';
import config from '../../config';
import LoadMore from '../../components/LoadMoreArticlesLink';

const { Title } = Typography;

const { POSTS_URL } = config;

const LIMIT = 3;

const Blog = () => {
  const [state, setState] = useState({
    posts: [],
    requestError: false,
    loading: true,
    index: 0,
    showMore: true,
  });

  const loadPosts = useCallback(async () => {
    try {
      const res = await fetch(
        `${POSTS_URL}/?limit=${LIMIT}&offset=${state.index}&ordering=-published`,
      );
      if (res.ok) {
        const { results: posts, next } = await res.json();
        setState((prevState) => ({
          ...prevState,
          posts: [...prevState.posts, ...posts],
          loading: false,
          index: prevState.index + posts.length,
          showMore: next !== null,
          requestError: false,
        }));
      } else {
        throw new Error(res.statusText);
      }
    } catch (err) {
      setState((prevState) => ({
        ...prevState,
        posts: [],
        requestError: true,
        loading: false,
        index: 0,
        showMore: true,
      }));
    }
  }, [state.index]);

  useEffect(() => {
    loadPosts();
  }, []);

  if (state.loading) {
    return (
      <div className="blog-wrapper">
        <Spin size="large" />
      </div>
    );
  }

  if (state.requestError) {
    return (
      <div className="blog-wrapper">
        <Title level={3}>
          <Trans>Server unavailable</Trans>
        </Title>
      </div>
    );
  }

  return (
    <div className="blog-wrapper loaded">
      {state.posts.map((post) => {
        const { slug } = post;
        return <BlogItem key={slug} postDetails={post} />;
      })}
      {state.showMore && <LoadMore onClick={loadPosts} />}
    </div>
  );
};

export default Blog;
