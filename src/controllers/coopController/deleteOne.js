import {dbGet, dbRun} from "../../db/index.js";
import error from "../../responses/error.js";
import success from "../../responses/success.js";

export default async function deleteOne(req, res)
{
    const coop = await dbGet("SELECT id FROM coop WHERE id = ?", [req.params.id]);

    if (coop.length === 0)
        return error(res, 404, "Coop Not Found");

    // Kicks all chickens out of the coop
    await dbRun("UPDATE chickens SET coopId = NULL WHERE coopId = ?", [req.params.id]);

    // Deletes the coop
    await dbRun("DELETE FROM coop WHERE id = ?", [req.params.id]);

    return success(res, 202, `Deleted row ${req.params.id} with success`);
}