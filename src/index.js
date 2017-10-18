import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.svg';
import './App.css';

import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  fetchSubreddit(subreddit) {
    return fetch("https://www.reddit.com/r/" + subreddit + ".json", {
      method: 'GET', 
      mode: 'cors',
      headers: {'Accept': 'application/json'}
    }); 
  }

  visit(subreddit) {
    this.fetchSubreddit(subreddit)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          subreddit: subreddit,
          children: responseJson.data.children,
        });
        return this.state.subreddit
      });
  }

  render() {
    const subreddit = this.state.subreddit || this.visit('all')
    const children = this.state.children

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">RB.ReactReddit</h1>
        </header>
        <div className="page-wrapper">
          <div>
            <h2>Select a Subreddit</h2>
            <button onClick={() => this.visit('AskReddit')}>/r/AskReddit</button>
            <button onClick={() => this.visit('funny')}>/r/funny</button>
            <button onClick={() => this.visit('todayilearned')}>/r/todayilearned</button>
            <button onClick={() => this.visit('science')}>/r/science</button>
            <button onClick={() => this.visit('worldnews')}>/r/worldnews</button>
            <button onClick={() => this.visit('pics')}>/r/pics</button>
            <button onClick={() => this.visit('IAmA')}>/r/IAmA</button>
          </div>
          <h3>You are traversing /r/{subreddit} <small style={{fontWeight: 300}}><a href="#" className="link-grey">(view on reddit)</a></small></h3>
          <div className="App-intro">
            <TopicList children={children}/>
          </div>
        </div>
      </div>
    );
  }
}

class TopicList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  render() {

    if(this.props.children) {
      return (
        <ul className="list">
          {this.props.children.map(child => (
            <ListElement key={child.data.id} data={child.data}/>
          ))}
        </ul>
      )
    }
    return JSON.stringify(this.props);
  }
}

class ListElement extends React.Component {
  getThumbnail() {
    let thumb = this.props.data.thumbnail

    if(thumb == 'default' || !thumb) {
      return process.env.PUBLIC_URL + 'link-variant.png'
    } else if (thumb == 'nsfw') {
      return process.env.PUBLIC_URL + 'alert-circle-outline.png'
    } else if (thumb == 'self') {
      return process.env.PUBLIC_URL + 'reddit.png'
    }
    return thumb
  }

  render() {
    const thumb = this.getThumbnail()

    return (
      <li className="list-element">
        {console.log(this.props.data)}

        <div className="block center" style={{width: 80, flexShrink: 0}}>
          <div className="ts"><a className="link-grey" href="#">▲</a></div>
          <div className="ts">{this.props.data.score}</div>
          <div className="ts"><a className="link-grey" href="#">▼</a></div>
        </div>

        <div className="block" style={{width: 80, flexShrink: 0}}>
          <img
            src={thumb}
            style={{width: '64px'}}
          />
        </div>

        <div className="block">
          <div className="mb">
            <a href={this.props.data.url}>{this.props.data.title}</a>
          </div>

          <div className="ts mb">
            From <a href={'http://www.reddit.com' + this.props.data.subreddit_name_prefixed}>
              {this.props.data.subreddit_name_prefixed}
            </a>
          </div>

          <div className="ts mb">
            <a className="link-grey" href="#">{this.props.data.num_comments} comments</a>
          </div>
        </div>
      </li>
    )
  }
}


ReactDOM.render(<App component={<TopicList sub='rickandmorty'/>}/>, document.getElementById('root'));
registerServiceWorker();



// import * as types from './actionTypes';

// function url() {
//   return 'https://jsonplaceholder.typicode.com/users';
// }

// export function receiveUser(json) {
//   return {type: types.RECEIVE_USER, name: json[0].name};
// }

// export function fetchUser() {
//   return dispatch => {
//     return fetch(url(), {
//       method: 'GET',
//       mode: 'cors',
//       credentials: 'include',
//       headers: {
//         'Accept': 'application/json'
//       }
//     })
//     .then(response => response.json())
//     .then(json => dispatch(receiveUser(json)));
//   };
// }
