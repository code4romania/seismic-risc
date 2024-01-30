import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Spin } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Trans } from '@lingui/macro';
import config from '../../config';
import BlogCard from '../BlogCard';

const { Title } = Typography;

const { POSTS_URL } = config;

const LIMIT = 4;

export default ({ title, postSlug = null }) => {
  const [state, setState] = useState({
    posts: [],
    requestError: false,
    loading: true,
  });

  useEffect(() => {
    const loadPosts = async (slug) => {
      try {
        const res = await fetch(`${POSTS_URL}/?limit=${LIMIT}&ordering=-published`);
        if (res.ok) {
          let { results: posts } = await res.json();
          if (slug) {
            posts = posts.filter((post) => post.slug !== slug);
          }
          if (posts.length === LIMIT) {
            posts.pop();
          }

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
    };

    loadPosts(postSlug);
  }, [postSlug]);

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
            <Title level={2}>
              <EnvironmentOutlined />
              {title}
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
          <Title level={2}>
            <EnvironmentOutlined />
            {title}
          </Title>
        </Col>
      </Row>
      <Row gutter={[20, 20]} type="flex" justify="center">
        {state.posts.map((post, i) => (
          <Col key={post.slug} xs={24} md={12} lg={8}>
            <BlogCard cardIndex={i} title={post.title} imageUrl={post.image} slug={post.slug} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
