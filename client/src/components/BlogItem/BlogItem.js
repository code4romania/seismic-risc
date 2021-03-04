import { Col, Row, Typography } from 'antd';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Trans } from '@lingui/macro';

const { Paragraph, Text, Title } = Typography;

const BlogItem = ({ postDetails }) => {
  const { url } = useRouteMatch();
  const { image, title, created, slug } = postDetails;
  const previewText = postDetails.preview_text;
  const authorFullName = `${postDetails.author_first_name} ${postDetails.author_last_name}`;
  return (
    <Row className="blog-item" gutter={{ md: 24, lg: 32 }}>
      <Col className="blog-image" sm={24} md={12} lg={10}>
        <img src={image} alt={title} />
      </Col>
      <Col className="blog-meta" sm={24} md={12} lg={14}>
        <Title level={3} underline>
          {title}
        </Title>
        <Text type="secondary">
          <Trans>
            Published by {authorFullName} • {new Date(created).toLocaleDateString()}
          </Trans>
        </Text>
        <Paragraph>{previewText}...</Paragraph>
        <Link to={`${url}/${slug}`} className="show-more">
          <Trans>Read more</Trans>
        </Link>
      </Col>
    </Row>
  );
};

export default BlogItem;
