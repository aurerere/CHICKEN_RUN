import error from "../../responses/error.js";
import {dbRun} from "../../db/index.js";
import success from "../../responses/success.js";

export default async function create(req, res)
{
    try {
        // Gets the body and prepares it
        let name = req.body.name;

        name = name ? name.toString().trim(): name;

        if (!name)
            return error(res, 400, "Invalid query");

        // Formats the birthday to a SQLite friendly date string
        const insert = await dbRun(
            'INSERT INTO coop (name) VALUES (?)',
            [name]
        );

        return success(res, 201, `Coop created with id ${insert.lastID}.`);
    }
    catch (e) {
        console.log(e);
        return error(res, 500, "Internal server error");
    }
}