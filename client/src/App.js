import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { useGlobalContext } from './context';

import Home from './containers/home';
import Guide from './containers/guide';
import Blog from './containers/blog';
import Footer from './components/Footer';
import Terms from './containers/Terms';
import Policy from './containers/Policy';

import './styles/theme.scss';

const App = () => {
  const { currentLanguage, languageChange } = useGlobalContext();

  useEffect(() => {
    languageChange(currentLanguage);
  }, []);

  return (
    <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/ghid">
            <Guide />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/termeni-si-conditii">
            <Terms />
          </Route>
          <Route path="/politica-de-confidentialitate">
            <Policy />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </I18nProvider>
  );
};

export default App;
