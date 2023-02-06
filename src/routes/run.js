import express from "express";
import runController from "../controllers/runController/index.js";

const chicken = express.Router()
    .post("/:id", runController.stepIncr)
;


export default chicken;