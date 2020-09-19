import React from 'react';
import ListEntry from './ListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    Top repos out of {props.repos.length} by Forks / Watchers.
    <div>
      {props.repos.map(repo => (
        <ListEntry key={repo.id} repo={repo}/>
      ))}
    </div>
  </div>
)

export default RepoList;