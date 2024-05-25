import { createSignal, onMount } from 'solid-js';
import { useParams } from "@solidjs/router";

export default function Listen() {

    const channelID = useParams().id;

    const [paragraph, setParagraph] = createSignal('');

    function logUpdate(para: string) {
        fetch(`/api/newevent`, {
            method: 'POST',
            body: JSON.stringify({ 
                content:  para,
                channel: channelID
            })
        });
        setParagraph(para);
    }

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
                console.log('Received event: ', data);
                setParagraph(data.message)
            });
        };
        document.body.appendChild(script);
    });

    return (
        <div class="max-w-7xl m-auto">
            <h1>Pusher Test</h1>
            <p>Listening to channel <code>{channelID}</code></p>
            <input value={paragraph()} onInput={(e) => logUpdate(e.currentTarget.value)} class='w-full h-96 border-2 border-gray-300 rounded-md p-4' />
        </div>
    );
}
