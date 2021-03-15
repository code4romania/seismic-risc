import { React } from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

export default ({ title, imageUrl }) => {
  return (
    <Card className="blog-post-card">
      <Title level={4}>{title}</Title>
      <div className="img-container">
        <img src={imageUrl} alt={title} />
      </div>
    </Card>
  );
};
