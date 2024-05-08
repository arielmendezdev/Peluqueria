const BaseController = require('./base.controller')

const { Local, Address, Employee } = require('../models')

class CompanyController extends BaseController {
  constructor({ db }) {
    super(db, "Company");
  }

  async getByPk(req, res) {
    const { id } = req.params;
    try {
      const response = await this.db[this.entity].findByPk(id, 
        { 
          include: [
            { model: Local, as: "locals", 
              include: [
                { model: Address, as: "address" },
                { model: Employee, as: "employees", 
                  include: { model: Address, as: "address"}
                }
              ]
            },
          ]
        }
      );
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  }
  
  async getByEmail(req, res) {
    const { email } = req.params;
    try {
      const response = await this.db[this.entity].findOne(
        { where: { email: email } },
        {
          include: [
            {
              model: Local, as: "locals",
              include: [
                { model: Address, as: "address" },
                { model: Employee, as: "employees",
                    include: { model: Address, as: "address" },
                },
              ],
            },
          ],
        }
      );
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  }
  
  async getAll(req, res) {
    try {
      const response = await this.db[this.entity].findAll({
        include: { all: true },
      });
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = CompanyController