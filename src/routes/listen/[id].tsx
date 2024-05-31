import { createSignal, onCleanup, onMount } from 'solid-js';
import { useParams } from "@solidjs/router";
import { Title } from '@solidjs/meta';
import HowToUse from '~/components/HowToUse';
import { bulletlist } from '~/components/editorFuncs/bulletList';
import { numberlist } from '~/components/editorFuncs/numberList';
import { checklist } from '~/components/editorFuncs/checkList';
import { makeBase, makeHeading, toggleBold, toggleItalic, toggleUnderline } from '~/components/editorFuncs/makeBold';
import { Base, Bold, H1, Italic, Underline } from '~/components/icons/basic';
import { baseText } from '~/components/editorFuncs/baseText';
import { h1 } from '~/components/editorFuncs/h1';
import { table } from '~/components/editorFuncs/table';
import { getCaretCharOffset } from '~/components/editorFuncs/caretOffset';
import { findHtmlIndexOfTextIndex } from '~/components/editorFuncs/findHtmlIndexOfTextIndex';

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


    const [showUser, setShowUser] = createSignal(false);
    const [userID, setUserID] = createSignal('');

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
        // "base&nbsp;" then change into base text
        baseText(para, checkboxStates);
        // "h1&nbsp;" then change into h1 text
        h1(para, checkboxStates);
        // "table&nbsp;" then change into table
        table(para, checkboxStates);

        // get caret position of change
        const caretPos = getCaretCharOffset(document.getElementById("editableDiv")!);
        // console.log(caretPos);
        // const testText = para.replace(/(<([^>]+)>)/gi, "").replace(/&nbsp;/, " ")
        // console.log(testText, testText.length);
        // console.log(testText[caretPos-1])
        // console.log(findHtmlIndexOfTextIndex(para, caretPos-1))
        // console.log(para[findHtmlIndexOfTextIndex(para.replace(/&nbsp;/, " "), caretPos-1)])


        const testingSplit = para.replace(/(<([^>]+)>)/gi, "238917481784911").replace(/&nbsp;/, " ").split("238917481784911"); 
        console.log(testingSplit)

        let count = 0
        let depth = 0
        for (var x in testingSplit) {
            for (var i = 0; i < testingSplit[x].length; i++) {
                if (count == caretPos-1) {
                    console.log("found, " + testingSplit[x][i], x, i)
                    depth = testingSplit[x].split(testingSplit[x][i]).length - 1
                    break;
                }
                count +=1 
            }
        }
        console.log(depth)

        const existingDiv = document.getElementById('userID');
        if (existingDiv) {
            existingDiv.remove();
        }

        fetch(`/api/newevent`, {
            method: 'POST',
            body: JSON.stringify({ 
                content:  para.replace(/&nbsp;/, " "),
                channel: channelID,
                sessionID: sessionID,
                userID: "MHA",
                caretPos: findHtmlIndexOfTextIndex(para.replace(/&nbsp;/, " "), caretPos-1, depth)
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
                    setUserID(data.userID);
                    setShowUser(true);
    
                    const firstHalf = data.message.slice(0, data.caretPos);
                    const secondHalf = data.message.slice(data.caretPos);
                    console.log(data.message.length, data.caretPos)
                    console.log(data.message[data.caretPos])
                    console.log(firstHalf, " + ", secondHalf)
                    const newInner = firstHalf + "<span id='userID' class='tooltip' onclick='document.getElementById(\"userID\").remove()'>" + userID() + "</span>" + secondHalf;
                    document.getElementById('editableDiv')!.innerHTML = newInner;                    
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
            <main class="max-w-7xl m-auto mt-10 min-h-screen">
                <div class='grid grid-cols-1 md:grid-cols-4 gap-8 mb-2'>
                    <div class="col-span-2">
                        <h1 class="header">Pusher Test</h1>
                        <p>Listening to channel <code>{channelID}</code></p> 
                        <p>User ID: <code>{userID()}</code></p>
                        <p>Show User: <code>{showUser()}</code></p>
                    </div>
                    <div class="flex flex-row justify-center col-span-1">
                        <button class="bg-slate-200 p-2 my-auto rounded-l-lg" onclick={() => {toggleBold(); logUpdate(document.getElementById("editableDiv")!.innerHTML, paragraph())}}>
                            <Bold />
                        </button>
                        <button class="bg-slate-200 p-2 my-auto" onclick={() => {toggleUnderline(); logUpdate(document.getElementById("editableDiv")!.innerHTML, paragraph())}}>
                            <Underline />
                        </button>
                        <button class="bg-slate-200 p-2 my-auto" onclick={() => {toggleItalic(); logUpdate(document.getElementById("editableDiv")!.innerHTML, paragraph())}}>
                            <Italic />
                        </button>
                        <button class="bg-slate-200 p-2 my-auto" onclick={() => {makeHeading(); logUpdate(document.getElementById("editableDiv")!.innerHTML, paragraph())}}>
                            <H1 />
                        </button>
                        <button class="bg-slate-200 p-2 my-auto rounded-r-lg" onclick={() => {makeBase(); logUpdate(paragraph(), paragraph());}}>
                            <Base />
                        </button>
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