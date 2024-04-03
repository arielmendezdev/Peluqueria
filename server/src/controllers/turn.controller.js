const BaseController = require('./base.controller')

const { Local, Employee, Client, Acomp } = require('../models')

class TurnController extends BaseController {
  constructor({ db }) {
    super(db, "Turn");
  }

  async getAll(req, res) {
    try {
      const response = await this.db[this.entity].findAll({
        // include: [
        //   { model: Local, as: "local" },
          
        // ],
      });
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = TurnController