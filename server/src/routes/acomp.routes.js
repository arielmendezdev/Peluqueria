const { Router } = require('express');

module.exports = ({ AcompController }) => {
    const router = Router()

    router.get('/', AcompController.getAll.bind(AcompController))
    router.get('/:id', AcompController.getByPk.bind(AcompController))
    router.post('/', AcompController.create.bind(AcompController))
    router.put('/:id', AcompController.update.bind(AcompController))
    router.delete('/:id', AcompController.delete.bind(AcompController))

    return router

};

