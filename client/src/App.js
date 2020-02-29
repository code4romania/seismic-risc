import React, { useState, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { I18nProvider } from "@lingui/react";

import Home from "./containers/home";
import Blog from "./containers/blog";
import Footer from "./components/Footer";
import Terms from "./containers/Terms";
import Policy from "./containers/Policy";
import catalogEn from "./locales/en/messages.js";
import catalogRo from "./locales/ro/messages.js";

import "./styles/theme.scss";

const catalogs = { en: catalogEn, ro: catalogRo };

const App = () => {
  const [language, setLanguage] = useState("ro");

  const languageChangeCallback = useCallback(languageCode => {
    setLanguage(languageCode);
  }, []);
  return (
    <I18nProvider language={language} catalogs={catalogs}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home
              language={language}
              languageChangeCallback={languageChangeCallback}
            />
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
