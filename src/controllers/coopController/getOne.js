import {dbGet} from "../../db/index.js";
import success from "../../responses/success.js";
import error from "../../responses/error.js";

export default async function getOne(req, res)
{
    try {
        // Gets the coop
        let coop = await dbGet("SELECT * FROM coop WHERE id = ?", [req.params.id]);

        if (coop.length === 0)
            return error(res, 404, "Coop Not Found");

        coop = coop[0];

        // Gets the chickens in the coop
        const chickens = await dbGet(
            "SELECT id, name, birthday, steps, isRunning FROM chickens WHERE coopId = ?",
            [req.params.id]
        );

        // Adds the chickens to the coop
        for (const chicken of chickens) {
            chicken.isRunning = !!chicken.isRunning;
        }

        coop.chickens = chickens;

        return success(res, 200, "ok", coop);
    }

    catch (err) {
        console.log(err);
        return error(res, 500, "Internal Server Error")
    }
}