import React, { Component } from 'react';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="header"></div>
        <div className="container">
          <div className="column">
            <InboxPane/>
          </div>
          </div>
      </div>
    );
  }
}

class InboxPane extends Component {
  render() {
    return (
    <div id="inbox-pane">
      <h1>Inbox</h1>
    </div>
    );
  }
}

export default App;
