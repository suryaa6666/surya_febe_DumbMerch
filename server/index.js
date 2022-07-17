// Import Express
const express = require("express");

const cors = require('cors');

// import router
const router = require("./src/routes");

const app = express();

const port = 7777;

app.use(express.json());
app.use(cors());

// add end point & router
app.use("/api/v1", router);

app.use("/uploads", express.static("uploads"))

app.listen(port, () => console.log(`Server Run on port ${port}`));
