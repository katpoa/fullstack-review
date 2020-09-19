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
    this.getAll = this.getAll.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    console.log('getAll triggered!')
    axios.get('/repos') //success sent back too soon???
    .then(repos => {
      this.setState({
        repos: repos.data
      }, () => {
        console.log('current state: ', this.state)
      })
    })
    .catch(err => console.log(err));
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
    .then(() => {
      this.getAll()
    })
    .catch(err => (console.log(err)))
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));