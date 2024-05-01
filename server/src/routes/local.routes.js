const { Router } = require("express");

module.exports = ({ LocalController }) => {
    const router = Router()

    router.get('/', LocalController.getAll.bind(LocalController))
    router.get('/:id', LocalController.getByPk.bind(LocalController))
    router.get(
      "/company/:companyId",
      LocalController.getLocalsByCompany.bind(LocalController)
    );
    router.post('/', LocalController.create.bind(LocalController))
    router.put('/:id', LocalController.update.bind(LocalController))
    router.delete('/:id', LocalController.delete.bind(LocalController))

    return router
}
