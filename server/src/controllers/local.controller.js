const BaseController = require("./base.controller");
const { Address, Employee, Turn } = require("../models");

class LocalController extends BaseController {
  constructor({ db }) {
    super(db, "Local");
  }
  async getAll(req, res) {
    try {
      const response = await this.db[this.entity].findAll({
        include: [
            { model: Address, as: "address"},
            { model: Employee, as: "employees", 
                include: {
                    model: Address, as: "address"
                },
              },
            {model: Turn, as: "turns"}
        ]
      });
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = LocalController;
