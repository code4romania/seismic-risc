import { React } from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography } from 'antd';

const { Title } = Typography;

export default ({ title, imageUrl, slug }) => {
  return (
    <Link to={`/blog/${slug}`}>
      <Card className="blog-post-card">
        <div className="title-container">
          <Title
            ellipsis={{ rows: 2, expandable: false }}
            level={4}
            style={{ fontWeight: 400, paddingTop: '1rem' }}
          >
            {title}
          </Title>
        </div>
        <div className="img-container">
          <img src={imageUrl} alt={title} />
        </div>
      </Card>
    </Link>
  );
};
