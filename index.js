const express = require("express");

const Hubs = require("./data/hubs-model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("hello world!");
});

server.get("/hubs", (req, res) => {
  Hubs.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err =>
      res.status(500).json({ message: "error getting the list of hubs" })
    );
});

server.post("/hubs", (req, res) => {
  const hubInfo = req.body;
  console.log("hub info from body:", hubInfo);
  Hubs.add(hubInfo)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      res.status(500).json({ message: "error adding the hub" });
    });
});

server.delete("/hubs/:id", (req, res) => {
  const hubId = req.params.id;

  Hubs.remove(hubId)
    .then(hub => {
      res.status(200).json({ message: "hub deleted!" });
    })
    .catch(error => {
      res.status(500).json({ message: "error removing hub" });
    });
});

server.put("/hubs/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Hubs.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(400).json({ message: "hub not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "error updating hub" });
    });
});

const port = 8000;

server.listen(port, () => {
  console.log("API running on port 8000");
});
