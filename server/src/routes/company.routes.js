const { Router } = require('express');

module.exports = ({ CompanyController }) => {
    const router = Router()

    router.get('/', CompanyController.getAll.bind(CompanyController))
    router.get('/:id', CompanyController.getByPk.bind(CompanyController))
    router.get('/email/:email', CompanyController.getByEmail.bind(CompanyController));
    router.post('/', CompanyController.create.bind(CompanyController))
    router.put('/:id', CompanyController.update.bind(CompanyController))
    router.delete('/:id', CompanyController.delete.bind(CompanyController))

    return router
}