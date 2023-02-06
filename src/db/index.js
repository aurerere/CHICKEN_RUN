import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose();

/**
 * Turns sqlite3's insert callback system into a Promise system.
 * @param sql {String}
 * @param {Array<String|Number>} [params]
 * @returns {Promise<{lastID: Number, changes: Number}>}
 */
export function dbRun(sql, params)
{
    params = params === undefined ? [] : params;

    return new Promise((resolve, reject) =>
    {
        const db = new sqlite.Database("src/db/chicken_run.db");

        db.run(sql, params, function (err) {
            const res = this;

            if (err)
                reject(err);

            else
                resolve(res);
        });

        db.close();
    });
}

/**
 * Turns sqlite3's query callback system into a Promise system.
 * @param sql {String}
 * @param {Array<String|Number>} [params]
 * @returns {Promise<Object>}
 */
export function dbGet(sql, params)
{
    params = params === undefined ? [] : params;

    return new Promise((resolve, reject) =>
    {
        const db = new sqlite.Database("src/db/chicken_run.db");

        db.all(sql, params, function (err, row) {
            if (err)
                reject(err);

            else
                resolve(row);
        });

        db.close();
    });
}