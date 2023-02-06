import {dbGet} from "../../db/index.js";
import success from "../../responses/success.js";
import error from "../../responses/error.js";

export default async function getOne(req, res)
{
    try {
        let chicken = await dbGet("SELECT * FROM chickens WHERE id = ?", [req.params.id]);

        if (chicken.length === 0)
            return error(res, 404, "Not Found");

        chicken = chicken[0];
        chicken.isRunning = !!chicken.isRunning;

        return success(res, 200, "ok", chicken);
    }

    catch (err) {
        console.log(err);
        return error(res, 500, "Internal Server Error")
    }
}