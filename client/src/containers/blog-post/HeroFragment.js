import React from 'react';
import { Trans } from '@lingui/macro';

import Hero from '../../components/Hero';
import Sharing from '../../components/Sharing';

import heroImage from '../../images/blog_post_hero.png';

export default ({ postDetails }) => {
  const {
    title,
    author_first_name: authorFirstName,
    author_last_name: authorLastName,
    published,
  } = postDetails;
  const authorFullName = `${authorFirstName} ${authorLastName}`;
  return (
    <Hero
      heroImage={heroImage}
      title={title}
      titleLevel={3}
      subTitle={
        <Trans>
          Written by {authorFullName} • {new Date(published).toLocaleDateString()}
        </Trans>
      }
    >
      <Sharing />
    </Hero>
  );
};
