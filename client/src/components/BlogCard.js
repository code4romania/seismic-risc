import { React } from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography } from 'antd';

const { Title } = Typography;

export default ({ title, imageUrl, slug }) => {
  return (
    <Link to={`/blog/${slug}`}>
      <Card className="blog-post-card">
        <Title level={4}>{title}</Title>
        <div className="img-container">
          <img src={imageUrl} alt={title} />
        </div>
      </Card>
    </Link>
  );
};
