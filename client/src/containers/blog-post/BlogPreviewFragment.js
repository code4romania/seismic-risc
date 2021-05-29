import React from 'react';
import { Trans } from '@lingui/macro';

import BlogPreview from '../../components/BlogPreview';

export default ({ postSlug }) => {
  return <BlogPreview title={<Trans>Other articles</Trans>} postSlug={postSlug} />;
};
