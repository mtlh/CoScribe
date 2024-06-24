import type { APIEvent } from "@solidjs/start/server";

export async function POST({request}: APIEvent) {
    const formData = await new Response(request.body).json()
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(formData, name, email, password);

    if (email === "admin@example.com" && password === "password") {
        return new Response(JSON.stringify({ success: true }));
    }

    return new Response(JSON.stringify({ success: false }), {
        status: 401,
    });
}