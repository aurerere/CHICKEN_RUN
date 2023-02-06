import error from "../../responses/error.js";
import {dbGet, dbRun} from "../../db/index.js";
import success from "../../responses/success.js";

export default async function create(req, res)
{
    try {
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
        if (coopId !== null) {
            const coop = await dbGet("SELECT * FROM coop WHERE id = ?", [coopId]);

            if (coop.length === 0)
                return error(res, 404, "Coop Not Found");
        }

        // Formats the birthday to a SQLite friendly date string
        birthday = birthday !== null ? new Date(birthday).toISOString().split("T")[0] : null;

        // Inserts the chicken
        const insert = await dbRun(
            'INSERT INTO chickens (name, birthday, weight, coopId) VALUES (?, ?, ?, ?)',
            [name, birthday, weight, coopId]
        );

        return success(res, 201, `Chicken created with id ${insert.lastID}.`);
    }
    catch (e) {
        console.log(e);
        return error(res, 500, "Internal server error");
    }
}