import Pusher from "pusher";
import type { APIEvent } from "@solidjs/start/server";

export function GET({ params }: APIEvent) {

    if (!params.channel) {
        return {
            status: 400,
            body: JSON.stringify({ message: "Missing channel." })
        };
    }
    
    const pusher = new Pusher({
        appId: process.env.PUSHER_APP_ID!,
        key: process.env.PUSHER_APP_KEY!,
        secret: process.env.PUSHER_APP_SECRET!,
        cluster: "eu",
        useTLS: true
    });
    
    const random = Math.floor(Math.random() * 100).toFixed(0);
    pusher.trigger(params.channel, "my-event", {
    message: "hello world! number: " + random
    });

    return {
        status: 200,
        body: JSON.stringify({ message: "event created." })
    };
}
  