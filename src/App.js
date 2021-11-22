import React from 'react';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from "react-bootstrap";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Top from "./contents/main/Top";
import Error from "./contents/error/Error";
import SharedHeader from "./contents/shared/Header";

function App() {
    React.useEffect(()=>{
        let elems = document.getElementById("adspace").childNodes;
        if(elems.length==4){
            let elem = elems[2];
            elem.setAttribute("aria-hidden", "true");
            elem.setAttribute("tabindex", "-1");
        }
    });

    return (
        <Container style={{"max-width": "720px"}}>
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
