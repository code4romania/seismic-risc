import { React } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

export default ({ title, imageUrl, slug, cardIndex }) => {
  return (
    <Link to={`/blog/${slug}`}>
      <Card
        className={`blog-post-card card-${cardIndex}`}
        cover={<div style={{ backgroundImage: `url(${imageUrl})` }} />}
        title={title}
      />
    </Link>
  );
};
