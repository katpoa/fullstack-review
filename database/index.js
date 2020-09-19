const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/fetcher'); //127.0.0.1:27017

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', console.log.bind(console, 'connection opened!'));

let repoSchema = mongoose.Schema({

  id: Number, // {type: String, unique: true}
  handle: String,
  owner_id: Number,
  repo_name: String,
  description: String,
  forksByWatchers: Number,
  url: String

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
  //findByIdAndUpdate(repo.id, {upsert: true})
  Repo.findByIdAndRemove(repo.id, () => (console.log('found duplicate and removed~!')));

  let gits = new Repo ({
    id: repo.id,
    handle: repo.owner.login,
    owner_id: repo.owner.id,
    repo_name: repo.name,
    description: repo.description,
    forksByWatchers: forksByWatchers(repo),
    // forksByWatchers: repo.forks,
    url: repo.html_url
  });
  // console.log(gits);
  // gits.create()

  gits.save();
}

let getRepos = (callback) => {
  db.collection('repos').find().sort([['forksByWatchers', -1]]).limit(25).toArray(
    (err, data) => {
      if (err) {
        callback(err)
      } else {
        callback(null, data)
      }
    }
  );
}

module.exports.saveRepo = saveRepo;
module.exports.getRepos = getRepos;