import React from 'react';
import { Layout } from 'antd';
import Header from './Header';

import '../App.css';

const { Footer, Content } = Layout;

export default ({ children }) => (
  <div className="App">
    <Layout style={{ background: 'none' }}>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  </div>
);
