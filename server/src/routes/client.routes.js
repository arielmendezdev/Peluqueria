const { Router } = require('express')

module.exports = ({ ClientController }) => {
    const router = Router()

    router.get('/', ClientController.getAll.bind(ClientController))
    router.get('/:id', ClientController.getByPk.bind(ClientController))
    router.post('/', ClientController.create.bind(ClientController))
    router.put('/:id', ClientController.update.bind(ClientController))
    router.delete('/:id', ClientController.delete.bind(ClientController))

    return router
}