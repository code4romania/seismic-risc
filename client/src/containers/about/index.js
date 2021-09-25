import React from 'react';
import Layout from '../../components/Layout';

import FirstParagraphs from './FirstParagraphsFragment';
import TextBox from './TextBoxFragment';
import SecondParagraph from './SecondParagraphFragment';
import Authors from './AuthorsFragment';
import ThirdParagraph from './ThirdParagraphFragment';
import HeroFragment from './HeroFragment';

export default () => (
  <Layout hero={<HeroFragment />}>
    <FirstParagraphs />
    <TextBox />
    <SecondParagraph />
    <Authors />
    <ThirdParagraph />
  </Layout>
);
