import {dbGet} from "../../db/index.js";
import success from "../../responses/success.js";
import error from "../../responses/error.js";

export default async function getOne(req, res)
{
    try {
        let chicken = await dbGet(
            "SELECT chickens.id, chickens.name, chickens.birthday, " +
            "chickens.weight, chickens.steps, chickens.isRunning," +
            "coop.name as coop_name, coop.id as coop_id " +
            "FROM chickens LEFT JOIN coop ON chickens.coopId = coop.id WHERE chickens.id = ?", [req.params.id]);

        if (chicken.length === 0)
            return error(res, 404, "Chicken Not Found");

        chicken = chicken[0];

        // Adds the coop to the chicken if it is in one
        if (chicken['coop_id'] !== null)
            chicken.coop = {
                id: chicken['coop_id'],
                name: chicken['coop_name']
            }
        else
            chicken.coop = null;

        // Converts the isRunning value to a boolean
        chicken.isRunning = !!chicken.isRunning;

        // Removes the coop_id and coop_name from the chicken object
        delete chicken['coop_id'];
        delete chicken['coop_name'];

        return success(res, 200, "ok", chicken);
    }

    catch (err) {
        console.log(err);
        return error(res, 500, "Internal Server Error")
    }
}