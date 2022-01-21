import React from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import useWindowSize from '../../../hooks/useWindowSize';

import config from '../../../config';

const { Paragraph } = Typography;
const { POSTS_URL } = config;

const BlogPostDetailsFragment = ({ handlePostLoaded }) => {
  const { slug } = useParams();
  const windowSize = useWindowSize();
  const [state, setState] = React.useState({
    postDetails: null,
    requestError: false,
  });
  React.useEffect(() => {
    fetch(`${POSTS_URL}/${slug}/`)
      .then((res) => (res.status === 200 ? res.json() : null))
      .then((postDetails) => {
        setState((prevState) => ({
          ...prevState,
          postDetails,
          requestError: postDetails === null,
        }));
        handlePostLoaded(postDetails);
      })
      .catch(() => {
        setState((prevState) => ({
          ...prevState,
          postDetails: null,
          requestError: true,
        }));
      });
  }, [slug]);

  if (state.postDetails === null) {
    return state.requestError ? (
      <p>
        <Trans>Article not found</Trans>
      </p>
    ) : (
      <p />
    );
  }

  return (
    <Row
      type="flex"
      justify="center"
      align="top"
      style={{ marginTop: '2rem', marginBottom: '2rem' }}
    >
      <Col>
        <Paragraph style={{ textAlign: 'justify', wordBreak: 'break-all' }}>
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
