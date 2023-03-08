const express = require("express");
const Wilder = require("./entity/Wilder");
const { dataSource } = require("./utils");
const wilderController = require("./controller/wilderController");
const skillController = require("../src/controller/skillController");

const server = "3000";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello jeune developeur");
});

//CRUD Wilder
app.post("/api/wilder", wilderController.create);

app.get("/api/wilders", wilderController.findAll);

app.get("/api/wilders/:id", wilderController.findOneById);

app.delete("/api/wilders/:id", wilderController.deleteById);

app.put("/api/wilders/:id", wilderController.updateByName);

//CRUD Skill
app.post("/api/skill", skillController.create);

app.get("/api/skills", skillController.findAll);

app.get("/api/skills/:name", skillController.getByName);

app.put("/api/skills/:name", skillController.updateByName);

app.delete("/api/skills/:name", skillController.deleteByName);

//http://localhost:3000/api//wilder/<123>/skill/<123>/add
app.post("/api/wilder/:wilderId/skill/:skillId/add", wilderController.addSkill);

const start = async () => {
  await dataSource.initialize();
  app.listen(3000, () => console.log(`Server started on port ${server}`));
};
//start the server
start();
