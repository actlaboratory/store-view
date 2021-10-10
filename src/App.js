import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from "react-bootstrap";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Top from "./contents/main/Top";

function App() {
    return (
        <Container style={{"max-width": "720px"}}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Top} />
                </Switch>
            </BrowserRouter>
        </Container>
    );
}

export default App;
