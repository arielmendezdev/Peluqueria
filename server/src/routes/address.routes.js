const { Router } = require('express');

module.exports = ({ AddressController }) => {
    const router = Router()

    router.get('/', AddressController.getAll.bind(AddressController))
    router.get('/:id', AddressController.getByPk.bind(AddressController))
    router.post('/', AddressController.create.bind(AddressController))
    router.put('/:id', AddressController.update.bind(AddressController))
    router.delete('/:id', AddressController.delete.bind(AddressController))

    return router

}