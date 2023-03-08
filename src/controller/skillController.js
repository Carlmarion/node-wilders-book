const { dataSource } = require("../utils");
const Skill = require("../entity/Skill");

module.exports = {
  create: async (req, res) => {
    try {
      await dataSource.getRepository(Skill).save(req.body);
      res.send("created Skill");
    } catch (e) {
      res.send("Error while creating Skill");
    }
  },

  //find all skills
  findAll: async (req, res) => {
    try {
      const skills = await dataSource.getRepository(Skill).find();
      return res.send(skills);
    } catch (e) {
      return res.send("Error while fetching Skills");
    }
  },

  //find a skill by its name
  getByName: async (req, res) => {
    try {
      const { name } = req.params;
      const skill = await dataSource.getRepository(Skill).findOneBy({ name });

      if (skill) {
        return res.send(skill);
      } else {
        return res.status(404).send(`Skill ${name} not found`);
      }
    } catch (e) {
      console.error(e);
      return res.status(500).send("Error while getting skill");
    }
  },

  //update a skill by its name
  updateByName: async (req, res) => {
    try {
      const { name } = req.params;
      const result = await dataSource.getRepository(Skill).findOneBy({ name });

      if (!result) {
        return res.status(404).send("Skill not found");
      }

      await dataSource.getRepository(Skill).update({ name }, req.body);
      res.send("Skill updated");
    } catch (e) {
      if (e.errno === 19) {
        return res.status(409).send("Skill already exists");
      }
      return res.send("Error while updating skill");
    }
  },

  //delete skill by its name
  deleteByName: async (req, res) => {
    try {
      const { name } = req.params;
      const skill = await dataSource.getRepository(Skill).delete({ name });
    } catch (e) {
      console.error(e);
      return res.status(500).send("Error while deleting skill");
    }
  },
};
