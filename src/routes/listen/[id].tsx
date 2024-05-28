import { createSignal, onCleanup, onMount } from 'solid-js';
import { useParams } from "@solidjs/router";
import { Title } from '@solidjs/meta';
import HowToUse from '~/components/HowToUse';

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

        // "-&nbsp;" then change into a bullet point list
        if (para.indexOf("<div>-&nbsp;</div>") > -1 || para == "-&nbsp;") {
            const editableDiv = document.getElementById('editableDiv')!;
            const caretPos = getCaretCharOffset(editableDiv);
            console.log(caretPos);
            para = para.replace("-&nbsp;", "<ul class='list-disc'><li></li></ul>");
            editableDiv.innerHTML = para;
            const ulElements = editableDiv.querySelectorAll('ul.list-disc');
            if (ulElements.length > 0) {
                let ulIndex = 0;
                for (let i = 0; i < ulElements.length; i++) {
                    const ulPosition = getCaretCharOffset(ulElements[i]);
                    if (caretPos > ulPosition) {
                        ulIndex = i + 1;
                    } else {
                        break;
                    }
                }
                const range = document.createRange();
                range.setStartBefore(ulElements[Math.min(ulIndex, ulElements.length - 1)]);
                range.collapse(true);
                const sel = window.getSelection()!;
                sel.removeAllRanges();
                sel.addRange(range);
                editableDiv.focus();
            } else {
                console.error("No <ul> elements found after replacing '-&nbsp;'");
            }
        }

        // "1.&nbsp;" then change into a numbered list
        if (para.indexOf("<div>1.&nbsp;</div>") > -1 || para == "1.&nbsp;") {
            const editableDiv = document.getElementById('editableDiv')!;
            const caretPos = getCaretCharOffset(editableDiv);
            console.log(caretPos);
            para = para.replace("1.&nbsp;", "<ol class='list-decimal'><li></li></ol>");
            editableDiv.innerHTML = para;
            const olElements = editableDiv.querySelectorAll('ol.list-decimal');
            if (olElements.length > 0) {
                let olIndex = 0;
                for (let i = 0; i < olElements.length; i++) {
                    const olPosition = getCaretCharOffset(olElements[i]);
                    if (caretPos > olPosition) {
                        olIndex = i + 1;
                    } else {
                        break;
                    }
                }
                const range = document.createRange();
                range.setStartBefore(olElements[Math.min(olIndex, olElements.length - 1)]);
                range.collapse(true);
                const sel = window.getSelection()!;
                sel.removeAllRanges();
                sel.addRange(range);
                editableDiv.focus();
            } else {
                console.error("No <ol> elements found after replacing '1.&nbsp;'");
            }
        }

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

    let editableDivRef;
    onCleanup(() => {
        editableDivRef = null;
    });
    const handleInput = (e: { currentTarget: { innerHTML: any; }; }) => {
      const newTextContent = e.currentTarget.innerHTML;
      logUpdate(newTextContent);
    };
  
    return (
        <>
            <Title>CoScribe - Pusher Test</Title>
            <main class="max-w-7xl m-auto mt-10">
                <div class='flex flex-col items-center justify-center mb-8'>
                    <h1 class="header">Pusher Test</h1>
                    <p>Listening to channel <code>{channelID}</code></p> 
                    <HowToUse />
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


function getCaretCharOffset(element: any) {
    var caretOffset = 0;
    if (window.getSelection) {
      var range = window.getSelection()!.getRangeAt(0);
      var preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    } 
    // @ts-ignore
    else if (document!.selection && document.selection.type != "Control") {
      // @ts-ignore
      var textRange = document.selection.createRange();
      // @ts-ignore
      var preCaretTextRange = document.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}