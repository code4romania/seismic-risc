import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { ConfigProvider, App as AntdApp } from 'antd';

import Home from './containers/home';
import Terms from './containers/Terms';
import Policy from './containers/Policy';
import NotFound from './containers/404/404';
import AddBuilding from './containers/add-building';
import ThankYou from './containers/thankyou';
import BuildingMap from './containers/building-map';
import ScrollToTop from './components/ScrollToTop';
import { dynamicActivate, getCurrentLanguage } from './utils/i18n';
import './styles/theme.scss';

function App() {
  useEffect(() => {
    dynamicActivate(getCurrentLanguage());
  }, []);
  return (
    <I18nProvider i18n={i18n}>
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
              <Switch>
                <Route exact path="/">
                  <Home />
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
                <Route path="/harta">
                  <BuildingMap showTitle={false} />
                </Route>
                <Route component={NotFound} />
              </Switch>
            </>
          </Router>
        </AntdApp>
      </ConfigProvider>
    </I18nProvider>
  );
}

export default App;
