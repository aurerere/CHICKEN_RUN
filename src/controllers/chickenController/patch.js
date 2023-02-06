import error from "../../responses/error.js";
import {dbGet, dbRun} from "../../db/index.js";
import success from "../../responses/success.js";
import Coop from "../../routes/coop.js";

export default async function patch(req, res)
{
    try {
        // toChange is an Object of that will be patched
        const toChange = {};
        let { name, birthday, weight, coopId } = req.body;

        name = name ? name.toString().trim(): name;


        // if name === undefined, it means that the name is not provided, so it won't be patched
        if (name !== undefined && name)
            toChange['name'] = name;
        else if (name !== undefined)
            return error(res, 400, "Invalid query");


        // null in Date() corresponds to the start of the Unix timestamp
        if (birthday !== null && new Date(birthday).toString() !== "Invalid Date") {
            // Formats the birthday to a SQLite friendly date string
            birthday = new Date(birthday).toISOString().split("T")[0];
            toChange['birthday'] = birthday;
        }
        // if birthday === null, it means that the birthday needs to be set to null
        else if (birthday === null)
            toChange['birthday'] = null;
        else if (birthday !== undefined)
            return error(res, 400, "Invalid query");


        if (weight !== undefined && typeof weight === "number")
            toChange['weight'] = weight;
        else if (weight !== undefined)
            return error(res, 400, "Invalid query");


        if (typeof coopId === "number" || coopId === null)
            toChange['coopId'] = coopId;
        else if (coopId !== undefined)
            return error(res, 400, "Invalid query");


        // Checks if the coop exists if it is provided
        if (coopId) {
            const coop = await dbGet("SELECT * FROM coop WHERE id = ?", [coopId]);

            if (coop.length === 0)
                return error(res, 404, "Coop Not Found");
        }

        // If there is nothing to patch, it patches nothing
        if (Object.keys(toChange).length === 0)
            return success(res, 200, `Chicken ${req.params.id} patched with success.`);

        // Patches the chicken
        await dbRun(
            `UPDATE chickens SET ${Object.keys(toChange).map(key => `${key} = ?`).join(", ")} WHERE id = ?`,
            [...Object.values(toChange), req.params.id]
        );

        return success(res, 200, `Chicken ${req.params.id} patched with success.`);

    }
    catch (e) {
        console.log(e);
        return error(res, 500, "Internal Server Error");
    }
}