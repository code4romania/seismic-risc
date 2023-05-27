import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { ConfigProvider } from 'antd';

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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#EE4036',
          '@font-family': '"Source Sans Pro", sans-serif',
        },
      }}
    >
      <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
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
      </I18nProvider>
    </ConfigProvider>
  );
}

export default App;
