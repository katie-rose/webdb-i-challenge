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
      res
        .status(500)
        .json({ error: "Error getting the account from database" });
    });
});

server.post("/", (req, res) => {
  const post = req.body;
  db("accounts")
    .insert(post, "id")
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Error retrieving accounts from database" });
    });
});

server.put("/:id", (req, res) => {
  db("accounts")
  .where({ id: req.params.id})
  .update(req.body)
    .then(newPut => {
      res.status(200).json(newPut);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "You dun goofed" });
    });
});

server.delete("/:id", (req, res) => {
  db("accounts")
  .where("id", req.params.id)
  .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "You dun goofed" });
    });
});

module.exports = server;
