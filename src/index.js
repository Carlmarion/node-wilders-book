const express = require("express");
const wilderController = require("./controller/wilderController");
const server = "3000";
const Wilder = require("./entity/Wilder");
const { dataSource } = require("./utils");
const wilderController = require("./controller/wilderController");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello jeune developeur");
});

app.post("/api/wilder", wilderController.create);

const start = async () => {
  await dataSource.initialize();
  app.listen(3000, () => console.log(`Server started on port ${server}`));
};
//start the server
start();
