import React from 'react';

const ListEntry = ({repo}) => (
  <div className="repo">
    <a href={repo.url}>{repo.repo_name}</a>
  <ul>
    <li>GitHub handle: {repo.handle}</li>
    {/* <li>Repository name: {repo.repo_name}</li> */}
    <li>Description: {repo.description}</li>
    <li>Forks/Watchers: {repo.forksByWatchers}</li>
    {/* <li className="url">Url: {repo.url}</li> */}
  </ul>
  </div>

)

export default ListEntry;