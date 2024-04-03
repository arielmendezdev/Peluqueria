const BaseController = require('./base.controller')

class ServiceController extends BaseController {
    constructor({ db }) {
        super(db, 'Service')
    }
}

module.exports = ServiceController