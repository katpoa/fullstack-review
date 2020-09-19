import React from 'react';

const ListEntry = ({repo}) => (
  <ul>
    <li>GitHub handle: {repo.handle}</li>
    {/* <li>Repository name: {repo.repo_name}</li> */}
    <li>Description: {repo.description}</li>
    <li>Forks/Watchers: {repo.forksByWatchers}</li>
    {/* <li className="url">Url: {repo.url}</li> */}
  </ul>
)

export default ListEntry;