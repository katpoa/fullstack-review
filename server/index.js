const express = require('express');
let app = express();
const mongoose = require('mongoose');
const db = require('../database/index');
const getReposByUsername = require('../helpers/github');
const bodyParse = require('body-parser');

app.use('/', bodyParse.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', (req, res) => {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const { handle } = req.body;
  console.log('user to be saved: ', handle);
  getReposByUsername(handle, (data) => {
    data.map(repo => {
      db.saveRepo(repo, (err, results) => {
        if (err) {
          console.log('error: ', err)
          res.statusCode = 400;
          res.end(err);
        } else {
          console.log('successfully added: ', results)
          res.statusCode = 200;
          res.end();
        }
      });
    })
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  //mongodb query all repos

  db.getRepos(
    (err, data) => {
      if (err) {
        console.log('error: ', err)
        res.statusCode = 400;
        res.end(err);
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(data));
      }
  });

  // all.filter()

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

