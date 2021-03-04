import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row, Spin, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import BlogItem from '../../components/BlogItem/BlogItem';
import config from '../../config';
import LoadMore from '../../components/LoadMoreArticlesLink/LoadMoreArticlesLink';

const { Title, Paragraph } = Typography;

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
      const res = await fetch(`${POSTS_URL}/?ordering=-created`);
      if (res.ok) {
        const posts = await res.json();
        setState((prevState) => {
          const newIndex = prevState.index + LIMIT;
          const newList = [...prevState.posts, ...posts.slice(prevState.index, newIndex)];
          const newShowMore = newIndex < posts.length;
          return {
            ...prevState,
            posts: newList,
            loading: false,
            index: newIndex,
            showMore: newShowMore,
            requestError: false,
          };
        });
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
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

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
      <Row>
        <Col className="blog-top">
          <Title level={2} underline>
            <Trans>About Vulnerable Romania</Trans>
          </Title>
          <Paragraph>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, natus, illum nobis non
            quibusdam exercitationem temporibus tenetur est doloremque, voluptate quas minus nemo?
            Quidem nobis quae quo, blanditiis sequi omnis?
          </Paragraph>
        </Col>
      </Row>
      {state.posts.map((post) => {
        const { slug } = post;
        return <BlogItem key={slug} postDetails={post} />;
      })}
      {state.showMore && <LoadMore onClick={loadPosts} />}
    </div>
  );
};

export default Blog;
