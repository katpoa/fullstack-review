import React from 'react';

const ListEntry = ({repo}) => (
  <ul>
    <li>{repo.handle}</li>
    <li>{repo.repo_name}</li>
    <li>{repo.description}</li>
    <li>{repo.forksByWatchers}</li>
  </ul>
)

export default ListEntry;