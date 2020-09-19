import React from 'react';
import ListEntry from './ListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>
      {props.repos.map(repo => (
        <div key={repo.id} className="repo">
          <a href={repo.url}>{repo.repo_name}</a>
          <ListEntry repo={repo}/>
        </div>
      ))}
    </div>
  </div>
)

export default RepoList;