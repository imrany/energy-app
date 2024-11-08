 // Defined Appliances model/table
 export const Appliances = `
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