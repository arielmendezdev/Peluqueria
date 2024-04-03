const BaseController = require("./base.controller");

const { Address, Turn, Local } = require("../models");

class EmployeeController extends BaseController {
    constructor({ db }) {
        super(db, "Employee");
    }

    async getAll(req, res) {
        try {
            const response = await this.db[this.entity].findAll({
              include: [
                { model: Address, as: "address" },
                { model: Turn, as: "turns" },
                { model: Local, as: "local" },
              ],
            });
            res.send(response)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = EmployeeController;
