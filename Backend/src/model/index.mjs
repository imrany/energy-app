/*
* Contains all models and
* database queries
*/
import x from 'sqlite3';
const sqlite3=x.verbose();

// Connecting Database
export const db = new sqlite3.Database("database.db" , (err) => {
    if(err){
        console.log("Error Occurred - " + err.message);
    }else{
        console.log("DataBase Connected");
    }
})

// Define the SQL statement to create a table
const Appliances = `
    CREATE TABLE IF NOT EXISTS appliances (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        location_name TEXT NOT NULL,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        watts INTEGER NOT NULL,
        hours INTEGER NOT NULL,
        FOREIGN KEY (location_name) REFERENCES location(location_name)
    )
`;

const Sources = `
    CREATE TABLE IF NOT EXISTS sources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        location_name TEXT NOT NULL,
        wind INTEGER NOT NULL,
        solar INTEGER NOT NULL,
        gas INTEGER NOT NULL,
        coal INTEGER NOT NULL,
        FOREIGN KEY (location_name) REFERENCES location(location_name)
    )
`;

const Location = `
    CREATE TABLE IF NOT EXISTS location (
        location_name TEXT PRIMARY KEY NOT NULL,
        type varchar(10) DEFAULT 'user' not null,
        location_state TEXT NOT NULL
    )
`;

// Execute the SQL statement to create the table
function createTable(tableSql,tableName){
    db.serialize(() => {
        db.run(tableSql, function (error) {
            if (error) {
                return console.error(`Error creating ${tableName} table: ${error.message}`, error);
            }
            console.log(`${tableName} table created successfully`);
        });
    })
}

createTable(Location,'location')
createTable(Appliances,'appliances')
createTable(Sources,'sources')

// Close the database connection
// db.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log('Database connection closed');
// });