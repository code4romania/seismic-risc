import React from 'react';
import { Trans } from '@lingui/macro';

const LoadMoreArticlesLink = (props) => (
  <div className="load-more">
    <button type="button" onClick={(e) => e.preventDefault()} {...props}>
      <Trans>Load more articles</Trans>
    </button>
  </div>
);

export default LoadMoreArticlesLink;
