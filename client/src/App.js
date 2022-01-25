import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';

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

const App = () => {
  return (
    <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/despre">
            <About />
          </Route>
          <Route path="/ghid">
            <Guide />
          </Route>
          <Route exact path="/blog">
            <Blog />
          </Route>
          <Route path="/blog/:slug">
            <BlogPost />
          </Route>
          <Route path="/termeni-si-conditii">
            <Terms />
          </Route>
          <Route path="/politica-de-confidentialitate">
            <Policy />
          </Route>
          <Route path="/adauga-cladire">
            <AddBuilding />
          </Route>
          <Route path="/multumim">
            <ThankYou />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </I18nProvider>
  );
};

export default App;
