import { createClient } from "@libsql/client";

export async function GET() {

    const db = createClient({
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });
    await db.batch(
        [
            "CREATE TABLE IF NOT EXISTS Teams ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP )",
            "CREATE TABLE IF NOT EXISTS Users ( id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, verified BOOLEAN DEFAULT false, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP )",
            "CREATE TABLE IF NOT EXISTS Sessions ( id INTEGER PRIMARY KEY AUTOINCREMENT, userid INT REFERENCES Users(id), key VARCHAR(255) NOT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP )",
            "CREATE TABLE IF NOT EXISTS Documents ( id INTEGER PRIMARY KEY AUTOINCREMENT, owner INTEGER, teamID INTEGER, title TEXT, content TEXT, checkboxStates TEXT,createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (owner) REFERENCES Users(id), FOREIGN KEY (teamID) REFERENCES Teams(id) )",
            "CREATE TABLE IF NOT EXISTS TeamMembers ( teamID INTEGER, userID INTEGER, role TEXT, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (teamID) REFERENCES Teams(id), FOREIGN KEY (userID) REFERENCES Users(id), PRIMARY KEY (teamID, userID) )"
        ],
        "write"
    );    
    const rs = await db.execute("SELECT * FROM users");
    console.log(rs);

    return {
        status: 200,
        body: JSON.stringify({ message: "Hello World!" })
    };
}