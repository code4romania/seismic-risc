import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './styles/theme.scss';
import Home from "./containers/home";
import Blog from "./containers/blog";
import Footer from "./components/Footer";
import Terms from "./containers/Terms";
import Policy from "./containers/Policy";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
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
  )
}

export default App
