import { Col, Row, Typography } from 'antd';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Trans } from '@lingui/macro';

const { Paragraph, Text, Title } = Typography;

const BlogItem = ({ postDetails }) => {
  const { url } = useRouteMatch();
  const { image, title, published, slug } = postDetails;
  const previewText = postDetails.preview_text;
  const authorFullName = `${postDetails.author_first_name} ${postDetails.author_last_name}`;
  return (
    <Link to={`${url}/${slug}`} className="show-more">
      <Row className="blog-item">
        <Col className="blog-image" sm={24} md={12} lg={10}>
          <img src={image} alt={title} />
        </Col>
        <Col className="blog-meta" sm={24} md={12} lg={14}>
          <Title level={3} underline>
            {title}
          </Title>
          <Text type="secondary">
            <Trans>
              Published by {authorFullName} • {new Date(published).toLocaleDateString()}
            </Trans>
          </Text>
          <Paragraph>{previewText}</Paragraph>
        </Col>
      </Row>
    </Link>
  );
};

export default BlogItem;
