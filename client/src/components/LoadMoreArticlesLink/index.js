import React from 'react';
import { Trans } from '@lingui/macro';
import { Button } from 'antd';

const LoadMoreArticlesLink = (props) => (
  <div className="load-more">
    <Button onClick={(e) => e.preventDefault()} {...props}>
      <Trans>Load more articles</Trans>
    </Button>
  </div>
);

export default LoadMoreArticlesLink;
