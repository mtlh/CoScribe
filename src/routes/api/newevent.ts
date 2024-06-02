import Pusher from "pusher";
import type { APIEvent } from "@solidjs/start/server";

export async function POST(event: APIEvent) {

    const body = await event.request.json();

    console.log(body);

    if (!body.channel) {
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
    
    pusher.trigger(body.channel, "my-event", {
        message: body.content,
        sessionID: body.sessionID,
        userID: body.userID,
        caretPos: body.caretPos,
        target: body.target,
        index_array: body.index_array,
        childNumber: body.childNumber,
        offset: body.offset
    });

    return {
        status: 200,
        body: JSON.stringify({ message: "event created." })
    };
}
  