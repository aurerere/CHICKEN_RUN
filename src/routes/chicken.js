import express from "express";
import bodyParser from "body-parser";
import chickenController from "../controllers/chickenController/index.js";
import run from "./run.js";

const chicken = express.Router()
    .use(bodyParser.json())
    .use("/run", run)

    .post("/", chickenController.create)
    .get("/", chickenController.getAll)
    .get("/:id", chickenController.getOne)
    .delete("/:id", chickenController.deleteOne)
    .put("/:id", chickenController.put)
    .patch("/:id", chickenController.patch)
;

export default chicken;