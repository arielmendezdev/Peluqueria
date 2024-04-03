const BaseController = require("./base.controller");

const { Acomp, Turn } = require("../models");

class ClientController extends BaseController {
  constructor({ db }) {
    super(db, "Client");
  }

  async getAll(req, res) {
    try {
      const response = await this.db[this.entity].findAll({
        include: [
          { model: Acomp, as: "acomps" },
          { model: Turn, as: "turns" },
        ],
      });
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ClientController;