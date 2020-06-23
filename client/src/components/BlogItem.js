import { Col } from 'antd';
import React from 'react';

const getColumnSize = (size) => {
  switch (size) {
    case 'md':
      return 10;
    case 'lg':
      return 14;
    default:
      return 8;
  }
};

const BlogItem = ({ size, src, headline }) => (
  <Col xs={24} sm={12} md={getColumnSize(size)}>
    <div className="blog-item">
      <img src={src} alt={headline} />
      <div className="blog-meta">
        <p>{headline}</p>
      </div>
    </div>
  </Col>
);

export default BlogItem;
