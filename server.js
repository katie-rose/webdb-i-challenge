const express = require("express");
const db = require("./data/dbConfig.js");
const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  db("accounts")
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Error retrieving accounts from database" });
    });
});

server.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json({ error: "Error getting the account from database" });
    });
});

module.exports = server;
