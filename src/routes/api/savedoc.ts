import { createClient } from "@libsql/client";
import type { APIEvent } from "@solidjs/start/server";

export async function POST(event: APIEvent) {

    const body = await event.request.json();
    
    const db = createClient({
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });

    await db.execute({
        sql: "CREATE TABLE IF NOT EXISTS documents (id TEXT PRIMARY KEY, content TEXT)",
        args: [],
    });

    await db.execute({
        sql: "INSERT INTO documents (id, content) VALUES (?, ?) ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content",
        args: [body.channel, body.content],
    });

    return {
        status: 200,
        body: JSON.stringify({ message: "Saved." })
    };
}