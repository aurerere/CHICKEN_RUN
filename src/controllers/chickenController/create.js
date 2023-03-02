import error from "../../responses/error.js";
import {dbRun} from "../../db/index.js";
import success from "../../responses/success.js";

export default async function create(req, res)
{
    try {
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

        const insert = await dbRun(
            'INSERT INTO chickens (name, birthday, weight) VALUES (?, ?, ?)',
            [name, birthday, weight]
        );

        return success(res, 201, `Chicken created with id ${insert.lastID}.`, {id: insert.lastID});
    }
    catch (e) {
        console.log(e);
        return error(res, 500, "Internal server error");
    }
}