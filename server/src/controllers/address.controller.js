const BaseController = require("./base.controller");

class AddressController extends BaseController {
    constructor({ db }) {
        super(db, 'Address');
    }
}

module.exports = AddressController;