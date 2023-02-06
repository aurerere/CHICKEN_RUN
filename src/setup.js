import {dbRun} from "./db/index.js";

(async () => {
    try {
        await dbRun('CREATE TABLE IF NOT EXISTS chickens (' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            'name TEXT NOT NULL, ' +
            'birthday TEXT, ' +
            'weight REAL NOT NULL, ' +
            'steps INTEGER NOT NULL DEFAULT 0, ' +
            'isRunning INTEGER NOT NULL DEFAULT 0)'
        );

        console.log('\n');
        console.log("✔️ processed 'chickenController' table");
    }
    catch (e) {
        console.log('\n');
        console.log("Error while creating the tables");
        console.log(e);
    }

})();