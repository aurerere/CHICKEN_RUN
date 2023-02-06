import {dbGet} from "../../db/index.js";
import success from "../../responses/success.js";
import error from "../../responses/error.js";

export default async function getAll(req, res)
{
    try {
        const chickens = await dbGet(
            "SELECT chickens.id, chickens.name, chickens.birthday, " +
            "chickens.weight, chickens.steps, chickens.isRunning," +
            "coop.name as coop_name, coop.id as coop_id " +
            "FROM chickens LEFT JOIN coop ON chickens.coopId = coop.id");

        for (const chicken of chickens) {
            // Converts the isRunning value to a boolean
            chicken.isRunning = !!chicken.isRunning;

            // Adds the coop to the chicken if it is in one
            if (chicken['coop_id'] !== null)
                chicken.coop = {
                    id: chicken['coop_id'],
                    name: chicken['coop_name']
                }
            else
                chicken.coop = null;

            // Removes the coop_id and coop_name from the chicken object
            delete chicken['coop_id'];
            delete chicken['coop_name'];
        }

        return success(res, 200, "ok", chickens);
    }

    catch (err) {
        console.log(err);
        return error(res, 500, "Internal Server Error")
    }
}