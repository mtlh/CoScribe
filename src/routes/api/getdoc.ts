import { createClient } from "@libsql/client";
import type { APIEvent } from "@solidjs/start/server";

export async function POST(event: APIEvent) {

    const body = await event.request.json();
    
    const db = createClient({
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });

    const res = await db.execute({
        sql: "SELECT content, checkboxStates FROM Documents WHERE id = ?",
        args: [body.channel],
    });

    return {
        status: 200,
        body: JSON.stringify({ 
            message: res.rows[0].content, 
            checkboxStates: res.rows[0].checkboxStates
        })
    };
}