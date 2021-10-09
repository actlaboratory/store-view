import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from "react-bootstrap";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Top from "./contents/main/Top";

function App() {
    return (
        <Container>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Top} />
                </Switch>
            </BrowserRouter>
        </Container>
    );
}

export default App;
