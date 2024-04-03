class StartUp {
    constructor({ server }) {
        this.server = server;
    }

    async start() {
        await this.server.start();
    }
}

module.exports = StartUp;