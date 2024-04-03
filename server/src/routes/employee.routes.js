const { Router } = require('express')

module.exports = ({ EmployeeController }) => { 
    const router = Router()

    router.get('/', EmployeeController.getAll.bind(EmployeeController))
    router.get('/:id', EmployeeController.getByPk.bind(EmployeeController))
    router.post('/', EmployeeController.create.bind(EmployeeController))
    router.put('/:id', EmployeeController.update.bind(EmployeeController))
    router.delete('/:id', EmployeeController.delete.bind(EmployeeController))

    return router
}