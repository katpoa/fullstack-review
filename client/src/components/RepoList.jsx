import React from 'react';
import ListEntry from './ListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>
      {props.repos.map(repo => (
        <div key={repo.id}>
          <h3>{repo.repo_name}</h3>
          <ListEntry repo={repo}/>
        </div>
      ))}
    </div>
  </div>
)

export default RepoList;