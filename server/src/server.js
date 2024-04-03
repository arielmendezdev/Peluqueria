const express = require('express');

class Server {
    constructor({config, router}) {
        this.config = config,
        this.express = express()
        this.express.use(router)
    }

    start() {
        this.express.listen(this.config.PORT, ()=> {
            console.clear()
            console.log(`Application started at port: ${this.config.PORT}`)
        })
    }

}

module.exports = Server;