import { createClient } from "@libsql/client";

export async function GET() {

    const db = createClient({
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });
    await db.batch(
        [
            "CREATE TABLE IF NOT EXISTS teams ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, createdAt DATE DEFAULT CURRENT_TIMESTAMP, updatedAt DATE DEFAULT CURRENT_TIMESTAMP )",
            "CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, verified BOOLEAN DEFAULT false, createdAt DATE DEFAULT CURRENT_TIMESTAMP )",
            "CREATE TABLE IF NOT EXISTS documents ( id INTEGER PRIMARY KEY AUTOINCREMENT, owner INTEGER, teamID INTEGER, title TEXT, content TEXT, checkboxStates TEXT,createdAt DATE DEFAULT CURRENT_TIMESTAMP, updatedAt DATE DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (owner) REFERENCES users(id), FOREIGN KEY (teamID) REFERENCES teams(id) )",
            "CREATE TABLE IF NOT EXISTS teamMembers ( teamID INTEGER, userID INTEGER, role TEXT, createdAt DATE DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (teamID) REFERENCES teams(id), FOREIGN KEY (userID) REFERENCES users(id), PRIMARY KEY (teamID, userID) )"
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