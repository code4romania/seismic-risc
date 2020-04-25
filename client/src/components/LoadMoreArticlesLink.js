import React from 'react';

const LoadMoreArticlesLink = props => (
  <div className="load-more">
    <button type="button" onClick={e => e.preventDefault()} {...props}>
      ÎNCARCĂ MAI MULTE ARTICOLE
    </button>
  </div>
);

export default LoadMoreArticlesLink;
