import {dbGet} from "../../db/index.js";
import success from "../../responses/success.js";
import error from "../../responses/error.js";

export default async function getAll(req, res)
{
    try {
        const coops = await dbGet("SELECT * FROM coop");

        return success(res, 200, "ok", coops);
    }

    catch (err) {
        console.log(err);
        return error(res, 500, "Internal Server Error")
    }
}