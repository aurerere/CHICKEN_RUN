import express from "express";
import bodyParser from "body-parser";

const chicken = express.Router()
    .use(bodyParser.json())


export default chicken;