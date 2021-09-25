import React from 'react';
import { Typography } from 'antd';

import Hero from '../../components/Hero';
import Sharing from '../../components/Sharing';

import heroImage from '../../images/blog_post_hero.png';
import { ReactComponent as AccountBox } from '../../images/account_box.svg';
import { ReactComponent as Calendar } from '../../images/calendar-regular.svg';

const { Paragraph } = Typography;

export default ({ postDetails }) => {
  const {
    title,
    author_first_name: authorFirstName,
    author_last_name: authorLastName,
    created,
  } = postDetails;
  const authorFullName = `${authorFirstName} ${authorLastName}`;
  const createdDate = new Date(created).toLocaleDateString();
  return (
    <Hero heroImage={heroImage} title={title} titleLevel={3}>
      <Paragraph
        style={{ display: 'flex', alignItems: 'center', marginTop: '32px', marginBottom: '32px' }}
      >
        <AccountBox style={{ color: '#B60303', marginRight: '12px' }} />
        <span style={{ marginRight: '32px' }}>{authorFullName}</span>
        <Calendar style={{ color: '#B60303', width: '18px', marginRight: '12px' }} />
        <span>{createdDate}</span>
      </Paragraph>
      <Sharing />
    </Hero>
  );
};
