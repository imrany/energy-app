import x from 'sqlite3';
const sqlite3=x.verbose();

// Connecting Database
export const db = new sqlite3.Database("Data/database.db" , (err) => {
    if(err){
        console.log("Error Occurred - " + err.message);
    }else{
        console.log("DataBase Connected");
    }
})

// Define the SQL statement to create a table
const Appliances = `
    CREATE TABLE IF NOT EXISTS appliances (
        location_name PRIMARY KEY TEXT NOT NULL,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        watts INTEGER NOT NULL,
        hours TEXT NOT NULL
    )
`;

const Sources = `
    CREATE TABLE IF NOT EXISTS sources (
        wind INTEGER NOT NULL,
        solar INTEGER NOT NULL,
        gas INTEGER NOT NULL,
        coal INTEGER NOT NULL,
        location_state PRIMARY KEY TEXT NOT NULL
    )
`;

const Location = `
    CREATE TABLE IF NOT EXISTS location (
        location_name TEXT NOT NULL,
        type varchar(10) DEFAULT 'user' not null,
        location_state TEXT NOT NULL,
        PRIMARY KEY (location_name),
        FOREIGN KEY (location_name) REFERENCES appliances(location_name)
    )
`;

// Execute the SQL statement to create the table
function createTable(tableSql){
    db.serialize(() => {
        db.run(tableSql, function (err) {
            if (err) {
                return console.error('Error creating table:', err.message);
            }
            console.log('Table created successfully');
        });
    })
}

createTable(Location)
createTable(Appliances)
createTable(Sources)

// Close the database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Database connection closed');
});