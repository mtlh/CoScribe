// src/routes/api/signup.ts
import type { APIEvent } from "@solidjs/start/server";

export async function POST({ request }: APIEvent) {
    try {
        const formData = await request.json();
        console.log("Parsed form data:", formData);

        const { name, email, password, confirmPassword } = formData;
        console.log("Name:", name, "Email:", email, "Password:", password, "Confirm Password:", confirmPassword);

        // Passwords matching check
        if (password !== confirmPassword) {
            return new Response(JSON.stringify({ success: false, error: "Passwords do not match" }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Admin user check
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

    // Catch any errors that occur during the execution of the SQL query
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
