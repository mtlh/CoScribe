import { onMount } from 'solid-js';
import { useParams } from "@solidjs/router";

export default function Listen() {

    const channelID = useParams().id;

    onMount(() => {
        const script = document.createElement('script');
        script.src = "https://js.pusher.com/8.2.0/pusher.min.js";
        script.onload = () => {
            // Enable Pusher logging - don't include this in production
            // @ts-ignore
            Pusher.logToConsole = true;

            // Initialize Pusher
            // @ts-ignore
            const pusher = new Pusher('91d88f32be53f60ccdf0', {
                cluster: 'eu'
            });

            // Subscribe to the channel
            const channel = pusher.subscribe(channelID);
            // Bind an event handler to the event
            // @ts-ignore
            channel.bind('my-event', function(data) {
                alert(JSON.stringify(data));
            });
        };
        document.body.appendChild(script);
    });

    return (
        <>
            <h1>Pusher Test</h1>
            <p>
                Try publishing an event to channel <code>{channelID}</code>
                with event name <code>my-event</code>.
            </p>
        </>
    );
}
