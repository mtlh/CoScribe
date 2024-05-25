import { createClient } from "@libsql/client";

export async function GET() {

    const db = createClient({
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });
    await db.batch(
        [
            "CREATE TABLE IF NOT EXISTS users (email TEXT)",
            "DELETE FROM users",
            "INSERT INTO users (email) VALUES ('alice@example.com')",
            "INSERT INTO users (email) VALUES ('bob@example.com')",
        ],
        "write",
    );
    const rs = await db.execute("SELECT * FROM users");
    console.log(rs);

    return {
        status: 200,
        body: JSON.stringify({ message: "Hello World!" })
    };
}