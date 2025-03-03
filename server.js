const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

if (require.main === module) {
    const port = process.env.PORT || 5005;
    server.listen(port, () => {
        console.log(`JSON Server is running at http://localhost:${port}`);
    });
}

module.exports = server;
