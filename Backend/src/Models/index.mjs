import x from 'sqlite3';
import { Location } from './LocationModel.mjs';
import { Appliances } from './ApplianceModel.mjs';
import { NationalSources } from './NationalSourceModel.mjs';
const sqlite3=x.verbose();

// Connecting Database
export const db = new sqlite3.Database("database.db" , (err) => {
    if(err){
        console.log("Error Occurred - " + err.message);
    }else{
        console.log("DataBase Connected");
    }
})


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
createTable(NationalSources,'sources')

// Close the database connection
// db.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log('Database connection closed');
// });