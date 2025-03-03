const express = require("express");
const jsonServer = require("json-server");
const axios = require("axios");

const app = express();
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// ✅ Fetch db.json from an external source
const DB_URL = "https://github.com/sonphan18071999/tymex-nodejs/blob/main/db.json";

server.use(middlewares);

server.use(async (req, res, next) => {
    try {
        const response = await axios.get(DB_URL);
        const router = jsonServer.router(response.data);
        return router(req, res, next);
    } catch (error) {
        res.status(500).json({ error: "Failed to load database" });
    }
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello, world!" });
});

// Start server locally
if (require.main === module) {
    const port = process.env.PORT || 5005;
    app.use(server);
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

module.exports = app;
