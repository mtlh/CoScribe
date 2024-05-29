import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { useParams } from "@solidjs/router";
import { Title } from '@solidjs/meta';
import HowToUse from '~/components/HowToUse';
import { bulletlist } from '~/components/editorFuncs/bulletList';
import { numberlist } from '~/components/editorFuncs/numberList';
import { checklist } from '~/components/editorFuncs/checkList';
import { makeBase, makeHeading, toggleBold, toggleItalic, toggleUnderline } from '~/components/editorFuncs/makeBold';

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
                        sessionID: sessionID,
                        checkboxStates: checkboxStates.toString()
                    })
                });
            }
        }, debounceTime);
    };


    let checkboxStates: boolean[] = [];
    function logUpdate(para: string, currentPara: string) {

        let para_checkboxstates;
        // "-&nbsp;" then change into a bullet point list
        para_checkboxstates = bulletlist(para, checkboxStates);
        checkboxStates = para_checkboxstates[1];
        para = para_checkboxstates[0];
        // "1.&nbsp;" then change into a numbered list
        para_checkboxstates = numberlist(para, checkboxStates);
        checkboxStates = para_checkboxstates[1];
        para = para_checkboxstates[0];
        // "checklist&nbsp;" then change into a checklist
        para_checkboxstates = checklist(para, checkboxStates, currentPara);
        checkboxStates = para_checkboxstates[1];
        para = para_checkboxstates[0];

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

        const editableDiv = document.getElementById('editableDiv')!;
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
                editableDiv.innerHTML = load_paragraph.message;
                setParagraph(load_paragraph.message);
            }
            if (load_paragraph.checkboxStates) {
                checkboxStates = load_paragraph.checkboxStates.split(',');
                for (var x in checkboxStates) {
                    // @ts-ignore
                    checkboxStates[x] = checkboxStates[x] == 'true';
                }
            }
            const inputElements = editableDiv.querySelectorAll('input.checkbox');
            if (checkboxStates.length != inputElements.length) {
                while (checkboxStates.length < inputElements.length) {
                    checkboxStates.push(false);
                }
                while (checkboxStates.length > inputElements.length) {
                    checkboxStates.pop();
                }
            }
            inputElements.forEach((input, index) => {
                // @ts-ignore
                input.checked = checkboxStates[index];
                input.addEventListener('change', () => {
                    // @ts-ignore
                    checkboxStates[index] = input.checked;
                });
            });
        });
    });

    let editableDivRef;
    onCleanup(() => {
        editableDivRef = null;
    });
    const handleInput = (e: { currentTarget: { innerHTML: any; }; }) => {
      const newTextContent = e.currentTarget.innerHTML;
      logUpdate(newTextContent, paragraph());
    };
  
    return (
        <>
            <Title>CoScribe - Pusher Test</Title>
            <main class="max-w-7xl m-auto mt-10">
                <div class='grid grid-cols-1 md:grid-cols-4 gap-8 mb-2'>
                    <div class="col-span-2">
                        <h1 class="header">Pusher Test</h1>
                        <p>Listening to channel <code>{channelID}</code></p> 
                    </div>
                    <div class="flex flex-row justify-center gap-2 col-span-1">
                        <button class="bg-slate-200 p-2 w-20 h-10 m-auto rounded" onclick={() => {toggleBold(); logUpdate(document.getElementById("editableDiv")!.innerHTML, paragraph())}}>bold</button>
                        <button class="bg-slate-200 p-2 w-20 h-10 m-auto rounded" onclick={() => {toggleUnderline(); logUpdate(document.getElementById("editableDiv")!.innerHTML, paragraph())}}>underline</button>
                        <button class="bg-slate-200 p-2 w-20 h-10 m-auto rounded" onclick={() => {toggleItalic(); logUpdate(document.getElementById("editableDiv")!.innerHTML, paragraph())}}>italic</button>
                        <button class="bg-slate-200 p-2 w-20 h-10 m-auto rounded" onclick={() => {makeHeading(); logUpdate(document.getElementById("editableDiv")!.innerHTML, paragraph())}}>h1</button>
                        <button class="bg-slate-200 p-2 w-20 h-10 m-auto rounded" onclick={() => {makeBase(); logUpdate(paragraph(), paragraph());}}>Base</button>
                    </div>
                    <div class="col-span-1 m-auto">
                        <HowToUse />
                    </div> 
                </div>
                {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={saveParagraph}>Save</button> */}
                <div
                    ref={el => editableDivRef = el}
                    id='editableDiv'
                    contentEditable={true}
                    onInput={handleInput}
                    class="w-full border-2 border-gray-300 rounded-md px-8 py-4 min-h-[80dvh]"
                ></div>
            </main>
        </>
    );
};