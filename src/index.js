import express from "express";

import chicken from "./routes/chicken.js";

const PORT = 1337;

const app = express();

app.use("/chicken", chicken);

app.listen(PORT, () => console.log(`Server started (http://localhost:${PORT})`))