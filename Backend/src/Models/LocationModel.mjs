// Defined Location model/table
export const Location = `
    CREATE TABLE IF NOT EXISTS location (
        location_name TEXT PRIMARY KEY NOT NULL,
        type varchar(10) DEFAULT 'user' not null,
        location_state TEXT NOT NULL
    )
`;
