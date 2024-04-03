const { Router } = require("express");

module.exports = ({ ServiceController }) => {
    const router = Router()

    router.get('/', ServiceController.getAll.bind(ServiceController))
    router.get('/:id', ServiceController.getByPk.bind(ServiceController))
    router.post('/', ServiceController.create.bind(ServiceController))
    router.put('/:id', ServiceController.update.bind(ServiceController))
    router.delete('/:id', ServiceController.delete.bind(ServiceController))

    return router
}