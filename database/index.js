const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/fetcher'); //127.0.0.1:27017

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', console.log.bind(console, 'connection opened!'));



let repoSchema = mongoose.Schema({

  id: Number,
  handle: String,
  owner_id: Number,
  repo_name: String,
  description: String,
  forksByWatchers: Number

});

let Repo = mongoose.model('Repo', repoSchema);

let saveRepo = (repo, callback) => {
  // This function should save a repo or repos to
  // the MongoDB
  let forksByWatchers = (repo) => {
    if (repo.watchers === 0) {
      return repo.forks;
    }
    return repo.forks / repo.watchers;
  };

  //findOneAndRemove
  let gits = new Repo ({
    id: repo.id,
    handle: repo.owner.login,
    owner_id: repo.owner.id,
    repo_name: repo.name,
    description: repo.description,
    forksByWatchers: forksByWatchers(repo)
  });
  console.log(gits);
  gits.save((err, results) => {
    console.log(results);
    if (err) {
      callback(err)
    } else {
      callback(null, results)
    }
  });
}

// saveRepo()
let getRepos = (callback) => {
  const data = db.collection('repos').find().toArray(
    (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, data)
      }
    }
  )
}

module.exports.saveRepo = saveRepo;
module.exports.getRepos = getRepos;