import { createSignal, onCleanup, onMount } from 'solid-js';
import { useParams } from "@solidjs/router";
import { Title } from '@solidjs/meta';

export default function Listen() {

    const channelID = useParams().id;

    let sessionID: string;
    try {
        sessionID = localStorage.getItem('sessionID')!;
        if (!sessionID) {
            sessionID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('sessionID', sessionID);
        }
    } catch (e) {
        sessionID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    const [paragraph, setParagraph] = createSignal('');

    // function saveParagraph() {
    //     fetch(`/api/savedoc`, {
    //         method: 'POST',
    //         body: JSON.stringify({ 
    //             content:  paragraph(),
    //             channel: channelID,
    //             sessionID: sessionID
    //         })
    //     });
    // }

    let debounceTimeout: string | number | NodeJS.Timeout | undefined;
    let lastCallTime = 0;
    const debounceTime = 2000; // 2 seconds
    const throttleTime = 10000; // 10 seconds
    const fetchWithDebounce = () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const currentTime = Date.now();
            if (currentTime - lastCallTime >= throttleTime) {
                lastCallTime = currentTime;
                fetch(`/api/savedoc`, {
                    method: 'POST',
                    body: JSON.stringify({ 
                        content:  paragraph(),
                        channel: channelID,
                        sessionID: sessionID
                    })
                });
            }
        }, debounceTime);
    };

    function logUpdate(para: string) {
        fetch(`/api/newevent`, {
            method: 'POST',
            body: JSON.stringify({ 
                content:  para,
                channel: channelID,
                sessionID: sessionID
            })
        });
        fetchWithDebounce()
        setParagraph(para);
    }

    onMount(async () => {
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
                if (data.sessionID != sessionID) {
                    console.log('Not my event');
                    setParagraph(data.message)
                    document.getElementById('editableDiv')!.innerHTML = data.message;
                }
            });
        };
        document.body.appendChild(script);

        const res = await fetch(`/api/getdoc`, {
            method: 'POST',
            body: JSON.stringify({ 
                channel: channelID,
                sessionID: sessionID
            })
        });
        res.json().then(data => {
            const load_paragraph = JSON.parse(data.body);
            if (load_paragraph.message) {
                document.getElementById('editableDiv')!.innerHTML = load_paragraph.message;
            }
        });
    });

    let editableDiv;
    onCleanup(() => {
      editableDiv = null;
    });
    const handleInput = (e: { currentTarget: { innerHTML: any; }; }) => {
      const newTextContent = e.currentTarget.innerHTML;
      logUpdate(newTextContent);
    };
  
    return (
        <>
            <Title>CoScribe - Pusher Test</Title>
            <main class="max-w-7xl m-auto mt-10">
                <h1 class="header">Pusher Test</h1>
                <p>Listening to channel <code>{channelID}</code></p> 
                {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={saveParagraph}>Save</button> */}
                <div
                ref={el => editableDiv = el}
                id='editableDiv'
                contentEditable={true}
                onInput={handleInput}
                class="w-full border-2 border-gray-300 rounded-md p-4"
                ></div>
            </main>
        </>
    );
  };