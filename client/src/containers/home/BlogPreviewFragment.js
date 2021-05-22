import React, { useEffect, useState, useCallback } from 'react';
import { Row, Col, Icon, Typography, Spin } from 'antd';
import { Trans } from '@lingui/macro';
import config from '../../config';
import BlogCard from '../../components/BlogCard';

const { Title } = Typography;

const { POSTS_URL } = config;

const LIMIT = 3;

export default () => {
  const [state, setState] = useState({
    posts: [],
    requestError: false,
    loading: true,
  });

  const loadPosts = useCallback(async () => {
    try {
      const res = await fetch(`${POSTS_URL}/?limit=${LIMIT}&ordering=-published`);
      if (res.ok) {
        const { results: posts } = await res.json();
        setState((prevState) => ({
          ...prevState,
          posts,
          loading: false,
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
      }));
    }
  }, []);

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
      <div className="blog-preview">
        <Row>
          <Col span={24}>
            <Title level={3} underline type="secondary">
              <Icon type="environment" />
              <Trans>Blog</Trans>
            </Title>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Title level={4}>
              <Trans>Server unavailable</Trans>
            </Title>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div className="blog-preview">
      <Row type="flex" justify="space-around">
        <Col span={24}>
          <Title level={3} type="secondary" underline>
            <Icon type="environment" />
            <Trans>Blog</Trans>
          </Title>
        </Col>
      </Row>
      <Row gutter={[20, 8]} type="flex" justify="start">
        {state.posts.map((post, i) => (
          <Col key={post.slug} lg={8} span={24}>
            <BlogCard cardIndex={i} title={post.title} imageUrl={post.image} slug={post.slug} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
