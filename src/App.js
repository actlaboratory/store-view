import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Top from "./contents/main/Top";
import Error from "./contents/error/Error";
import SharedHeader from "./contents/shared/Header";

function App() {
  React.useEffect(() => {
    let addiv = document.getElementById("vdbanner");
    if (addiv) {
      let ad = addiv.firstChild;
      if (ad) {
        ad.setAttribute("aria-hidden", "true");
        ad.setAttribute("tabindex", "-1");
      }
    }
  }, []);
  return (
    <Container style={{ maxWidth: "720px" }}>
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
