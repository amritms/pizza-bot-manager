import React, { Component } from 'react';
import './App.css';
import samples from './sample-data'

class App extends Component {
  constructor() {
    super();
    this.state = {
      "humans": {},
      "stores": {},
      "selectedConversation": []
    }

    this.loadSampleData = this.loadSampleData.bind(this);
    this.setSelectedConversation = this.setSelectedConversation.bind(this);

  }
  // getInitialState() {
  //   return {
  //     "humans": {},
  //     "stores": {}
  //   }
  // }

  loadSampleData() {
    this.setState(samples);
  }

  setSelectedConversation(human_index) {
    this.setState({
      selectedConversation: this.state.humans[human_index].conversations
    })
  }
  
  render() {
    return (
      <div className="App">
        <div id="header"></div>
        <button onClick={this.loadSampleData}>Load Sample Data</button>
        <div className="container">
          <div className="column">
            <InboxPane humans={this.state.humans} setSelectedConversation={this.setSelectedConversation}/>
          </div>
          <div className="column">
            <ConversationPane conversation={this.state.selectedConversation} /></div>
          <div className="column">
            <StorePane stores={this.state.stores}/>
          </div>
        </div>
      </div>
    );
  }
}

class InboxPane extends Component {
  constructor(){
    super();
    this.renderInboxItem = this.renderInboxItem.bind(this);
  }

  renderInboxItem(human) {
    console.log(this.props.setSelectedConversation);
    return <InboxItem key={human} index={human} details={this.props.humans[human]} setSelectedConversation={this.props.setSelectedConversation} />;
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
  constructor(){
    super()
    this.setSelected = this.setSelected.bind(this);
  }
  
  sortByDate(a, b){
    return a.time > b.time ? -1 : a.time < b.time ? 1 : 0;
  }

  messageSummary(conversation) {
    var lastMessage = conversation.sort(this.sortByDate)[0];
    return lastMessage.who + ' said: "' + lastMessage.text + '" @ ' + lastMessage.time.toDateString();
  }

  setSelected() {
    this.props.setSelectedConversation(this.props.index);
  }

  componentDidMount() {
    // this.refs.name.value = '';
  }

  render(){
    return (
      <tr>
        <td><a onClick={this.setSelected}>{this.messageSummary(this.props.details.conversations)}</a></td>
        <td>{this.props.index}</td>
        <td>{this.props.details.orders.sort(this.sortByDate)[0].status}</td>
      </tr>
    )
  }
}


class ConversationPane extends Component {
  constructor(){
    super()
    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage(val) {
    return <Message who={val.who} text={val.text} key={val.time.getTime()}/>
  }

  render() {
    return(
      <div id="conversation-pane">
        <h1>Conversation</h1>
        <h3>Select a conversation from the inbox</h3>
        <div id="messsages">
          {this.props.conversation.map(this.renderMessage)}
        </div>
      </div>
    );
  }
}

class Message extends Component{
  render() {
    return <p>{this.props.who} said: {this.props.text}</p>
  }
}

class StorePane extends Component{
  constructor(){
    super()
    this.renderStore = this.renderStore.bind(this);
  }
  renderStore(store) {
    return <Store key={store} index={store} details={this.props.stores[store]}/>
  }

  render() {
    return(
      <div id="store-pane">
        <h1>Stores & Ovens</h1>
        <ul>
          {Object.keys(this.props.stores).map(this.renderStore)}
        </ul>
      </div>
    );
  }
}

class Store extends Component{
  getCount(status) {
        return this.props.details.orders.filter((n) => {
          return n.status === status
        }).length;
  }

  render() {
    return(
      <li>
        <p>{this.props.index}</p>
        <p>Orders Confirmed: {this.getCount("Confirmed")}</p>
        <p>Orders In the oven: {this.getCount("In THe Oven")}</p>
        <p>Orders Delivered: {this.getCount("Delivered")}</p>
      </li>
    )
  }
}

export default App;
