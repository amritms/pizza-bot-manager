import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import {
  Switch,
  Redirect,
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <div>
      <Route path="/" component={App} />
      {/* <Route exact path="/conversation" component={ConversationPane} /> */}
      {/* <Route path="/conversation" render={() => <h1>Hello</h1>} /> */}
    </div>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
