class BaseController {
    constructor(db, entity) {
        this.db = db;
        this.entity = entity;
    }

    async getByPk(req, res) {
        const { id } = req.params
        try {
            const response = await this.db[this.entity].findByPk(id)
            res.send(response)
        } catch (error) {
            res.send(error)
        }
    }
    async getAll(req, res) {
        try {
            const response = await this.db[this.entity].findAll()
            res.send(response)
        } catch (error) {
            res.send(error)
        }
    }
    async create(req, res) {
        try {
            const response = await this.db[this.entity].create(req.body)
            res.send(response)
        } catch (error) {
            res.send(error)
        }
    }
    async update(req, res) {
        const { id } = req.params
        try {
            const response = await this.db[this.entity].findByPk(id)
            response.set(req.body)
            await response.save()
            res.send(response)
        } catch (error) {
            res.send(error)
        }
    }
    async delete(req, res) {
        const { id } = req.params
        try {
            await this.db[this.entity].destroy({where: { id: id}})
            res.send('Success deleted')
        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = BaseController