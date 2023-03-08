const { dataSource } = require("../utils");
const Wilder = require("../entity/Wilder");
const Skill = require("../entity/Skill");

module.exports = {
  create: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).save(req.body);
      res.send("created Wilder");
    } catch (e) {
      res.send("Error while creating wilder");
    }
  },

  //find all wilders
  findAll: async (req, res) => {
    try {
      const wilders = await dataSource.getRepository(Wilder).find();
      return res.send(wilders);
    } catch (e) {
      return res.send("Error while fetching Wilders");
    }
  },

  //find wilder by ID
  findOneById: async (req, res) => {
    try {
      const wilderRepository = dataSource.getRepository(Wilder);
      const wilder = await wilderRepository.findOneBy({
        id: req.params.id,
      });
      if (wilder) {
        return res.send(wilder);
      } else {
        return res.send("wilder not found");
      }
    } catch (e) {
      console.error(e);
      return res.send("Error while fetching wilder");
    }
  },

  //delete a wilder by ID
  deleteById: async (req, res) => {
    try {
      const { id } = req.params;
      const wilder = await dataSource.getRepository(Wilder).findOneBy({ id });
      const result = await dataSource.getRepository(Wilder).delete({ id });
      if (result.affected > 0) {
        return res.send(`Wilder ${id} has been deleted`);
      } else {
        return res.send("wilder not found");
      }
    } catch (e) {
      return res.send("Error while deleting wilder");
    }
  },

  //update a wilder by ID
  updateByName: async (req, res) => {
    try {
      const { name } = req.params;
      const result = await dataSource
        .getRepository(Wilder)
        .update(name, req.body);
      if (result) {
        return res.send(`wilder updated`);
      } else {
        return res.send("Wilder not found");
      }
    } catch (e) {
      return res.send("Error while updating wilder");
    }
  },

  addSkill: async (req, res) => {
    const wilderToUpdate = await dataSource.getRepository(Wilder).findOneBy({
      id: req.params.wilderId,
    });
    if (!wilderToUpdate) {
      return res.status(404).send("Wilder not found");
    }
    console.log(wilderToUpdate, "wilderToUpdate");

    const skillToAdd = await dataSource
      .getRepository(Skill)
      .findOneBy({ id: req.params.skillId });
    if (!skillToAdd) {
      return res.status(404).send("skill not found");
    }

    wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];

    await dataSource.getRepository(Wilder).save(wilderToUpdate);

    res.send("Skill added to wilder");
  },
};
