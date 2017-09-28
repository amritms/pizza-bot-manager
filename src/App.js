import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import samples from "./sample-data";

class App extends Component {
  constructor() {
    super();
    this.state = {
      humans: {},
      stores: {}
    };

    this.loadSampleData = this.loadSampleData.bind(this);
  }

  loadSampleData() {
    this.setState(samples);
  }

  render() {
    return (
      <div className="App">
        <div id="header" />
        <button onClick={this.loadSampleData}>Load Sample Data</button>
        <div className="container">
          <div className="column">
            <InboxPane humans={this.state.humans} />
          </div>
          <div className="column">
            <Router>
              <Route path="/conversation" component={ConversationPane} />
            </Router>
            {this.props.children || "select conversation from the inbox."}
          </div>
          <div className="column">
            <StorePane stores={this.state.stores} />
          </div>
        </div>
      </div>
    );
  }
}

class InboxPane extends Component {
  constructor() {
    super();
    this.renderInboxItem = this.renderInboxItem.bind(this);
  }

  renderInboxItem(human) {
    return (
      <InboxItem key={human} index={human} details={this.props.humans[human]} />
    );
  }

  render() {
    return (
      <div id="inbox-pane">
        <h1>Inbox</h1>
        <table>
          <thead>
            <tr>
              <th>Chat Received</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.humans).map(this.renderInboxItem)}
          </tbody>
        </table>
      </div>
    );
  }
}

class InboxItem extends Component {
  sortByDate(a, b) {
    return a.time > b.time ? -1 : a.time < b.time ? 1 : 0;
  }

  messageSummary(conversation) {
    var lastMessage = conversation.sort(this.sortByDate)[0];
    return (
      lastMessage.who +
      ' said: "' +
      lastMessage.text +
      '" @ ' +
      lastMessage.time.toDateString()
    );
  }

  render() {
    return (
      <tr>
        <td>
          <Link to={"/conversation/" + encodeURIComponent(this.props.index)}>
            {this.messageSummary(this.props.details.conversations)}
          </Link>
        </td>
        <td>{this.props.index}</td>
        <td>{this.props.details.orders.sort(this.sortByDate)[0].status}</td>
      </tr>
    );
  }
}

class ConversationPane extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.renderMessage = this.renderMessage.bind(this);
    this.loadConersationData = this.loadConersationData.bind(this);
  }

  loadConersationData(human) {
    // console.log(human);
    // console.log(samples.humans);
    // console.log(samples.humans[human].conversations);
    // this.setState({conversation: samples.humans[human].conversations});
  }

  // handle when user navigates / to /conversation/:human
  componentWillMount() {
    console.log(this.props);
    this.loadConersationData(this.props.humans);
  }

  // handle when user navigates /onversation/Rami to /conversation/Jeremy
  componentWillReceiveProps(nextProps) {
    this.loadConersationData(nextProps.match.params.human);
  }

  renderMessage(val) {
    return <Message who={val.who} text={val.text} key={val.time.getTime()} />;
  }

  render() {
    return (
      <div id="conversation-pane">
        <h1>Conversation</h1>
        <h3>{this.props.match.params.human}</h3>
        <div id="messsages" />
      </div>
    );
  }
}

class Message extends Component {
  render() {
    return (
      <p>
        {this.props.who} said: {this.props.text}
      </p>
    );
  }
}

class StorePane extends Component {
  constructor() {
    super();
    this.renderStore = this.renderStore.bind(this);
  }
  renderStore(store) {
    return (
      <Store key={store} index={store} details={this.props.stores[store]} />
    );
  }

  render() {
    return (
      <div id="store-pane">
        <h1>Stores & Ovens</h1>
        <ul>{Object.keys(this.props.stores).map(this.renderStore)}</ul>
      </div>
    );
  }
}

class Store extends Component {
  getCount(status) {
    return this.props.details.orders.filter(n => {
      return n.status === status;
    }).length;
  }

  render() {
    return (
      <li>
        <p>{this.props.index}</p>
        <p>Orders Confirmed: {this.getCount("Confirmed")}</p>
        <p>Orders In the oven: {this.getCount("In THe Oven")}</p>
        <p>Orders Delivered: {this.getCount("Delivered")}</p>
      </li>
    );
  }
}

export default App;
