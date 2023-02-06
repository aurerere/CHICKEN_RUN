import error from "../../responses/error.js";
import {dbGet, dbRun} from "../../db/index.js";
import success from "../../responses/success.js";

export default async function put(req, res)
{
    try {
        let coop = await dbGet("SELECT * FROM coop WHERE id = ?", [req.params.id]);

        if (coop.length === 0)
            return error(res, 404, "Coop Not Found");

        // Gets the body and prepares it
        let name = req.body.name;

        name = name ? name.toString().trim(): name;

        if (!name)
            return error(res, 400, "Invalid query");

        // Updates the coop
        await dbRun("UPDATE coop SET name = ? WHERE id = ?", [name, req.params.id]);

        return success(res, 200, `Coop ${req.params.id} updated with success.`);
    }
    catch (e) {
        console.log(e);
        return error(res, 500, "Internal server error");
    }

}