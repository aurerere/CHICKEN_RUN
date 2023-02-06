import error from "../../responses/error.js";
import {dbGet, dbRun} from "../../db/index.js";
import success from "../../responses/success.js";

export default async function deleteOne(req, res)
{
    try {
        const chicken = await dbGet("SELECT * FROM chickens WHERE id = ?", [req.params.id]);

        if (chicken.length === 0)
            return error(res, 404, "Not Found");

        await dbRun("DELETE FROM chickens WHERE id = ?", [req.params.id]);

        return success(res, 202, `Deleted row ${req.params.id} with success`);
    }

    catch (err) {
        console.log(err);
        return error(res, 500, "Internal Server Error")
    }
}