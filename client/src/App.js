import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { ConfigProvider, App as AntdApp } from 'antd';

import Home from './containers/home';
import About from './containers/about';
import Guide from './containers/guide';
import Blog from './containers/blog';
import BlogPost from './containers/blog-post';
import Terms from './containers/Terms';
import Policy from './containers/Policy';
import NotFound from './containers/404/404';
import AddBuilding from './containers/add-building';
import ThankYou from './containers/thankyou';
import ScrollToTop from './components/ScrollToTop';

import './styles/theme.scss';

import { messages as messagesRo } from './locales/ro/messages';

i18n.load({
  ro: messagesRo,
});
i18n.activate('ro');

function App() {
  return (
    <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#EE4036',
            fontFamily: '"Source Sans Pro", sans-serif',
            colorLink: '#EE4036',
            colorLinkHover: '#FA6E61',
            colorText: '#000000A6',
          },
        }}
      >
        <AntdApp>
          <Router>
            <>
              <ScrollToTop />
              <Routes>
                <Route exact="true" path="/" element={<Home />} />
                <Route path="/despre" element={<About />} />
                <Route path="/ghid" element={<Guide />} />
                <Route exact="true" path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/termeni-si-conditii" element={<Terms />} />
                <Route path="/politica-de-confidentialitate" element={<Policy />} />
                <Route path="/adauga-cladire" element={<AddBuilding />} />
                <Route path="/multumim" element={<ThankYou />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          </Router>
        </AntdApp>
      </ConfigProvider>
    </I18nProvider>
  );
}

export default App;
