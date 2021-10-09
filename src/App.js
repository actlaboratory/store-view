import {BrowserRouter, Route, Switch} from "react-router-dom";

import Top from "./contents/main/Top";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Top} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
