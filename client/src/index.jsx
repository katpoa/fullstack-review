import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    this.getAll()
  }

  getAll() {
    axios('/repos')
    .then(repos => {
      this.setState({
        repos: repos.data
      })
    })
  }

  search (term) {
    console.log(`${term} was searched`);
    axios({
      method: 'post',
      url: '/repos',
      data: {
        handle: [term]
      }
    })
    .then(this.getAll)
    .catch(err => (console.log(err)))
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));