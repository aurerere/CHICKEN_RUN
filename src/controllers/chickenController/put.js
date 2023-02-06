import {dbGet, dbRun} from "../../db/index.js";
import error from "../../responses/error.js";
import success from "../../responses/success.js";

export default async function put(req, res)
{
    try {
        // Checks if the chicken exists
        const chicken = await dbGet("SELECT * FROM chickens WHERE id = ?", [req.params.id]);

        // If the chicken doesn't exist, returns a 404
        if (chicken.length === 0)
            return error(res, 404, "Chicken Not Found");

        // Gets the inputs
        let { name, birthday=null, weight, coopId=null } = req.body;

        name = name ? name.toString().trim(): name;

        // Checks if the query is valid
        if (!name ||
            typeof weight !== "number" ||
            birthday !== undefined && birthday !== null && new Date(birthday).toString() === "Invalid Date" ||
            coopId !== undefined && coopId !== null && typeof coopId !== "number"
        )
        {
            return error(res, 400, "Invalid query");
        }

        // Prevents the weight from being negative
        weight = Math.abs(weight);

        // Checks if the coop exists if it is provided
        if (coopId) {
            const coop = await dbGet("SELECT * FROM coop WHERE id = ?", [coopId]);

            if (coop.length === 0)
                return error(res, 404, "Coop Not Found");
        }

        // Formats the birthday to a SQLite friendly date string
        birthday = birthday !== null ? birthday.toISOString().split("T")[0] : null;

        // Updates the chicken
        await dbRun(
            'UPDATE chickens SET name = ?, birthday = ?, weight = ?, coopId = ? WHERE id = ?',
            [name, birthday, weight, coopId, req.params.id]
        );

        return success(res, 200, `Chicken ${req.params.id} updated with success.`);
    }
    catch (e) {
        console.log(e);
        return error(res, 500, "Internal Server Error");
    }
}