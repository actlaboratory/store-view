import React from "react";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Top from "./contents/main/Top";
import Error from "./contents/error/Error";
import SharedHeader from "./contents/shared/Header";

function App() {
  React.useEffect(() => {
    alert(document.body.firstChild);
    let ad = document.body.firstChild.children;
    if (ad) {
      alert("ad element count " + ad.length);
      for (let i = 0; i < ad.length; i++) {
        alert("" + i + ": " + ad[i].nodeName);
      }
    }
  }, []);

  return (
    <Container style={{ "max-width": "720px" }}>
      <SharedHeader />
      <BrowserRouter>
        <Switch>
          <Route path="/error" component={Error} />
          <Route path="/" component={Top} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
