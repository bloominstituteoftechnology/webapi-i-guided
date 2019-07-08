const express = require("express"); //<<<< importing express

const Hubs = require("./data/hubs-model.js"); //<<<<<<< importing hubsData to make requests

const server = express();

server.use(express.json()); // <<<<<<<< to parse JSON into the post; remember to INVOKE it!

server.get("/", (req, res) => {
  res.send("Hello from the new node module");
});

//C-R-U-D Requests: Create - Read - Update - Delete

//R - read
server.get("/hubs", (req, res) => {
  Hubs.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//C - create
server.post("/hubs", (req, res) => {
  const hubsData = req.body;

  Hubs.add(hubsData)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//D - delete
server.delete("/hubs/:id", (req, res) => {
  const { id } = req.params;

  Hubs.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "This has been deleted" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//U - update
server.put("/hubs/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Hubs.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "Can't find that hub" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const port = 5000;
server.listen(port, () => console.log(`\n*** running on port ${port} *** \n`));
