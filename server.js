const express = require('express');
const db = require('./data/dbConfig.js');
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  db("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Error retrieving accounts from database" });
    });
});

module.exports = server;