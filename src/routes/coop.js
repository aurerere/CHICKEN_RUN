import express from "express";
import bodyParser from "body-parser";
import coopController from "../controllers/coopController/index.js";


const coop = express.Router()
    .use(bodyParser.json())
    .post("/", coopController.create)
    .get("/", coopController.getAll)
    .get("/:id", coopController.getOne)
    .delete("/:id", coopController.deleteOne)
    .put("/:id", coopController.put)
    .patch("/:id", coopController.patch)
;

export default coop;