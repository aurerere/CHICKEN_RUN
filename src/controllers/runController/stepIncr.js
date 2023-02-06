import {dbGet, dbRun} from "../../db/index.js";
import error from "../../responses/error.js";
import success from "../../responses/success.js";

export default async function stepIncr(req, res)
{
    try {
        const chickenId = req.params.id;

        const test = await dbGet('SELECT * FROM chickens WHERE id = ?', [chickenId]);

        if (test.length === 0)
            error(res, 404, "Chicken not found");

        await dbRun('UPDATE chickens SET steps = steps + 1, isRunning = 1 WHERE id = ?', [chickenId]);

        success(res, 200, `Chicken ${chickenId} stepped`);
    }
    catch (e) {
        console.log(e);
        error(res, 500, "Internal server error");
    }
}