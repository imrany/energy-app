// Defined National sources model/table
export const NationalSources = `
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