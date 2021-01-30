import React from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Tag, Typography } from 'antd';
import useWindowSize from '../../../hooks/useWindowSize';

import config from '../../../config';

const { Title, Paragraph } = Typography;
const { POSTS_URL } = config;

const BlogPostDetailsFragment = () => {
  const { slug } = useParams();
  const windowSize = useWindowSize();
  const [state, setState] = React.useState({
    postDetails: null,
    requestError: false,
  });
  React.useEffect(() => {
    fetch(`${POSTS_URL}/${slug}`)
      .then((res) => (res.status === 200 ? res.json() : null))
      .then((postDetails) => {
        setState((prevState) => ({
          ...prevState,
          postDetails,
          requestError: postDetails === null,
        }));
      })
      .catch(() => {
        setState((prevState) => ({
          ...prevState,
          postDetails: null,
          requestError: true,
        }));
      });
  }, []);

  if (state.postDetails === null) {
    return state.requestError ? <p>Nu a fost găsit</p> : <p />;
  }
  const authorFullName = `${state.postDetails.author_first_name} ${state.postDetails.author_last_name}`;

  return (
    <Row
      type="flex"
      justify="center"
      align="top"
      style={{ marginTop: '2rem', marginBottom: '2rem' }}
    >
      <Col span={16}>
        <Title level={3} style={{ textTransform: 'uppercase', textAlign: 'left' }}>
          {state.postDetails.title}
        </Title>
        <Paragraph style={{ textAlign: 'left' }}>
          Publicat de {authorFullName} • {new Date(state.postDetails.created).toLocaleDateString()}
        </Paragraph>
        <Paragraph style={{ textAlign: 'left' }}>
          {state.postDetails.tags.map((tag) => (
            <Tag key={tag}>#{tag}</Tag>
          ))}
        </Paragraph>
        <Paragraph style={{ textAlign: 'justify' }}>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: state.postDetails.text }} />
        </Paragraph>
        <Paragraph>
          <img
            src={state.postDetails.image}
            width="100%"
            style={{ maxHeight: windowSize.height }}
          />
        </Paragraph>
      </Col>
    </Row>
  );
};

export default BlogPostDetailsFragment;
