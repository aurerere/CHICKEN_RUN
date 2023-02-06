import {dbGet} from "../../db/index.js";
import success from "../../responses/success.js";
import error from "../../responses/error.js";

export default async function getAll(req, res)
{
    try {
        const chickens = await dbGet("SELECT * FROM chickens");

        for (const chicken of chickens) {
            chicken.isRunning = !!chicken.isRunning;
        }

        return success(res, 200, "ok", chickens);
    }

    catch (err) {
        console.log(err);
        return error(res, 500, "Internal Server Error")
    }
}