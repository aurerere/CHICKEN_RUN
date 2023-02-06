import {dbGet, dbRun} from "../../db/index.js";
import error from "../../responses/error.js";
import success from "../../responses/success.js";

export default async function put(req, res)
{
    try {
        const chicken = await dbGet("SELECT * FROM chickens WHERE id = ?", [req.params.id]);

        if (chicken.length === 0)
            return error(res, 404, "Not Found");

        // Gets the body and prepares it
        let name = req.body.name ? req.body.name.toString().trim() : undefined;
        let birthday = req.body["birthday"] && req.body["birthday"].toString().trim() ?
            new Date(req.body["birthday"]) : null;
        let weight = req.body.weight && req.body.weight.toString().trim() ? Number(req.body.weight) : NaN;

        // Checks if the query is valid
        if (!name || (birthday !== null && birthday.toString() === "Invalid Date") || isNaN(weight))
            return error(res, 400, "Invalid query");

        // Formats the birthday to a SQLite friendly date string
        birthday = birthday !== null ? birthday.toISOString().split("T")[0] : null;

        await dbRun(
            'UPDATE chickens SET name = ?, birthday = ?, weight = ? WHERE id = ?',
            [name, birthday, weight, req.params.id]
        );

        return success(res, 200, `Chicken ${req.params.id} updated with success.`);
    }
    catch (e) {
        console.log(e);
        return error(res, 500, "Internal Server Error");
    }
}