import React from 'react';
import Layout from '../../components/Layout';
import Share from '../../components/Sharing';

import TitleFragment from './TitleFragment';
import FirstParagraphs from './FirstParagraphsFragment';
import TextBox from './TextBoxFragment';
import SecondParagraph from './SecondParagraphFragment';
import Authors from './AuthorsFragment';
import ThirdParagraph from './ThirdParagraphFragment';

export default () => (
  <Layout>
    <TitleFragment />
    <Share />
    <FirstParagraphs />
    <TextBox />
    <SecondParagraph />
    <Authors />
    <ThirdParagraph />
  </Layout>
);
