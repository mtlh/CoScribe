// src/routes/api/login.ts
import type { APIEvent } from "@solidjs/start/server";

export async function POST({ request }: APIEvent) {
    try {
        const formData = await request.json();
        console.log("Parsed form data:", formData);

        const { email, password } = formData;
        console.log("Email:", email, "Password:", password);

        if (email === "admin@example.com" && password === "password") {
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        return new Response(JSON.stringify({ success: false }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return new Response(JSON.stringify({ success: false, error: "Invalid JSON" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
