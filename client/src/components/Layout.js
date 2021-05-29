import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

export default ({ children }) => (
  <div className="App">
    <Layout style={{ background: 'none' }}>
      <Header />
      <Content className="container">{children}</Content>
      <Footer />
    </Layout>
  </div>
);
