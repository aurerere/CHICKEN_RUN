import {dbRun} from "./db/index.js";

(async () => {
    console.log('\n');
    console.log("------ Database Setup ------");
    try {
        await dbRun(
            'CREATE TABLE IF NOT EXISTS coop (' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            'name TEXT NOT NULL)'
        );

        console.log("✔️ processed 'coop' table");

        await dbRun(
            'CREATE TABLE IF NOT EXISTS chickens (' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            'name TEXT NOT NULL, ' +
            'birthday TEXT, ' +
            'weight REAL NOT NULL, ' +
            'steps INTEGER NOT NULL DEFAULT 0, ' +
            'coopId INTEGER, ' +
            'isRunning INTEGER NOT NULL DEFAULT 0,' +
            'FOREIGN KEY(coopId) REFERENCES coop(id))'
        );

        console.log("✔️ processed 'chickens' table");

        console.log("Done :D")
    }
    catch (e) {
        console.log('\n');
        console.log("Error while creating the tables");
        console.log(e);
    }

})();