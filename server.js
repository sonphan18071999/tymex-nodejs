const express = require("express");
const jsonServer = require("json-server");
const axios = require("axios");

const app = express();
const middlewares = jsonServer.defaults();

app.use(cors({ origin: 'https://tymex-interview-frontend-sonphan-7g11.vercel.app' }));

//Since vercel treat the db.json as Readonly so I need to retrieve it raw data from github
const DB_URL = "https://raw.githubusercontent.com/sonphan18071999/tymex-nodejs/main/db.json";

app.use(middlewares);

app.use(async (req, res, next) => {
    try {
        const response = await axios.get(DB_URL);
        const data = response.data;

        if (!data.products) {
            return res.status(404).json({ error: "Products not found" });
        }

        const router = jsonServer.router({ products: data.products });

        router(req, res, next);
    } catch (error) {
        console.error("Error fetching db.json:", error.message);
        res.status(500).json({ error: "Failed to load database" });
    }
});

// Start server locally
if (require.main === module) {
    const port = process.env.PORT || 5005;
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}/products`);
    });
}

module.exports = app;
