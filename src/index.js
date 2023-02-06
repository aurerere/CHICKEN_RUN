import express from "express";

import chicken from "./routes/chicken.js";
import coop from "./routes/coop.js";

const PORT = 1337;

const app = express();

app.use("/chicken", chicken);
app.use("/coop", coop);

app.listen(PORT, () => console.log(`Server started (http://localhost:${PORT})`))