import error from "../../responses/error.js";
import {dbRun} from "../../db/index.js";
import success from "../../responses/success.js";

export default async function patch(req, res)
{
    try {
        const toChange = {};

        // Gets the body and prepares it
        let name = req.body.name ? req.body.name.toString().trim() : undefined;
        let birthday = req.body["birthday"] && req.body["birthday"].toString().trim() ?
            new Date(req.body["birthday"]) : null;
        let weight = req.body.weight ? (req.body.weight.toString().trim() ? Number(req.body.weight) : NaN) : undefined;

        if (name)
            toChange['name'] = name;

        if (birthday !== null && birthday.toString() !== "Invalid Date") {
            // Formats the birthday to a SQLite friendly date string
            birthday = birthday.toISOString().split("T")[0];
            toChange['birthday'] = birthday;
        }
        else if (birthday !== null)
            return error(res, 400, "Invalid query");

        if (!isNaN(weight))
            toChange['weight'] = weight;
        else if (isNaN(weight) && weight !== undefined)
            return error(res, 400, "Invalid query");

        await dbRun(
            `UPDATE chickens SET ${Object.keys(toChange).map(key => `${key} = ?`).join(", ")} WHERE id = ?`,
            [...Object.values(toChange), req.params.id]
        );

        return success(res, 200, `Chicken ${req.params.id} updated with success.`);

    }
    catch (e) {
        console.log(e);
        return error(res, 500, "Internal Server Error");
    }
}