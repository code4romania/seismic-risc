import React from 'react';
import { Trans } from '@lingui/macro';
import BlogPreview from '../../components/BlogPreview';

export default () => {
  return <BlogPreview title={<Trans>Blog</Trans>} />;
};
