const { Router } = require("express");

module.exports = ({ TurnController }) => {
    const router = Router()

    router.get('/', TurnController.getAll.bind(TurnController))
    router.get('/:id', TurnController.getByPk.bind(TurnController))
    router.post('/', TurnController.create.bind(TurnController))
    router.put('/:id', TurnController.update.bind(TurnController))
    router.delete('/:id', TurnController.delete.bind(TurnController))

    return router
}