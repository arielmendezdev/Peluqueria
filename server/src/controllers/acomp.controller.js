const BaseController = require('./base.controller')

const { Turn } = require("../models");

class AcompController extends BaseController {
  constructor({ db }) {
    super(db, "Acomp");
  }

  async getAll(req, res) {
    try {
      const response = await this.db[this.entity].findAll({
        include: [
            { model: Turn, as: "turns" }
        ],
      });
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = AcompController