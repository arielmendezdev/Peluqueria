const BaseController = require('./base.controller')

const { Local, Employee, Client, Acomp, Service } = require('../models')

class TurnController extends BaseController {
  constructor({ db }) {
    super(db, "Turn");
  }

  async getAll(req, res) {
    try {
      const response = await this.db[this.entity].findAll({
        include: [
          { model: Service, as: "service" },
          { model: Local, as: "local" },
          { model: Employee, as: "employee" },
          { model: Client, as: "client" },
          { model: Acomp, as: "acomp" },
        ],
      });
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = TurnController