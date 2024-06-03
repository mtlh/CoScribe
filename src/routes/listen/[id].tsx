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

        const elementsSplit = splitHtmlStringToText(para);
        console.log(elementsSplit)
    
        let count = 0;
        let depth = 0;
        let divdepth = 0;
        let found = false; 
        let target = "";

        for (var x in elementsSplit) {
            for (var i = 0; i < elementsSplit[x].length; i++) {
                // console.log(count, i, elementsSplit[x][i])
                if (count == caretPos - 1) {
                    console.log("found, " + elementsSplit[x][i], x, i);
                    target = elementsSplit[x][i];
                    depth = i;
                    divdepth = parseInt(x);
                    found = true;
                    break;
                }
                count += 1;
            }
            if (found) break;
        }

        console.log(count, caretPos, " element: ", divdepth, " content position: ", depth)

        // Create a temporary div to parse the HTML string
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = para.replace(/&nbsp;/g, " ");
        // Initialize the overall index
        let overallIndex = 0;
        let index_array = [];
        // Iterate over the child nodes before the target element
        for (let j = 0; j < tempDiv.childNodes.length; j++) {
            // console.log("j:", j, "element:", tempDiv.childNodes[j], "nodeType:", tempDiv.childNodes[j].nodeType, "overallIndex:", overallIndex);
            if (tempDiv.childNodes[j].nodeType === Node.ELEMENT_NODE) {
                // @ts-ignore
                if (tempDiv.childNodes[j].tagName.toLowerCase() === 'div') {
                    if (j < divdepth) {
                        // @ts-ignore
                        overallIndex += tempDiv.childNodes[j].outerHTML.length;
                        index_array.push(overallIndex);
                    } else if (j === divdepth) {
                        // If we reach the target element, add the index within the element
                        // @ts-ignore
                        overallIndex += tempDiv.childNodes[j].textContent.substring(0, depth).length;
                        index_array.push(overallIndex);
                        break;
                    }
                } else if (j === divdepth) {
                    // If the first node is a text node, add the index within the text content
                    console.log(tempDiv.childNodes[j], " textContent: ", tempDiv.childNodes[j].textContent)
                    // @ts-ignore
                    overallIndex += tempDiv.childNodes[j].textContent.substring(0, depth).length;
                    index_array.push(overallIndex);
                    break;
                }
            } else {
                // @ts-ignore
                overallIndex += tempDiv.childNodes[j].nodeValue.substring(0, depth).length;
                index_array.push(overallIndex);
            }
        }
        // console.log("Overall Index: ", overallIndex, " is a ", para.replace(/&nbsp;/g, " ")[overallIndex-1] + ". depth: ", depth)

        const existingDiv = document.getElementById('userID');
        if (existingDiv) {
            existingDiv.remove();
        }

        fetch(`/api/newevent`, {
            method: 'POST',
            body: JSON.stringify({ 
                content:  para.replace(/&nbsp;/g, " "),
                channel: channelID,
                sessionID: sessionID,
                userID: "MHA",
                // caretPos: findHtmlIndexOfTextIndex(para.replace(/&nbsp;/, " "), caretPos-1, depth, divdepth)
                caretPos: overallIndex,
                target: target,
                index_array: index_array,
                childNumber: divdepth,
                offset: depth
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

                    const editableDiv = document.getElementById('editableDiv')!;
                    editableDiv.innerHTML = data.message;
                    console.log(editableDiv.innerHTML)
                    const range = document.createRange();
                    const sel = window.getSelection()!;

                    // Assuming newCaretPos is the character position within the child node
                    let targetNode = editableDiv.childNodes[data.childNumber];
                    console.log('Target node:', targetNode);
                    // Create the span element with userID
                    const span = document.createElement('span');
                    span.id = 'userID';
                    span.className = 'tooltip'; // Or 'tooltip-left' depending on your logic
                    span.onclick = function() { span.remove(); };
                    span.textContent = userID();
                    // console.log(childIndex, data.index_array, data.index_array[childIndex-1], data.caretPos)
                    console.log(targetNode, " textContent: ", targetNode.textContent, " offset: ", data.offset)

                    // Handle different types of target nodes (text nodes vs element nodes)
                    if (targetNode.nodeType === Node.TEXT_NODE) {
                        // If the target node is a text node, set the range within the text content
                        console.log("Text node");
                        // Ensure the offset does not exceed the length of the text content
                        // @ts-ignore
                        const validOffset = Math.min(data.offset, targetNode.textContent.length);
                        range.setStart(targetNode, validOffset);
                    } else if (targetNode.nodeType === Node.ELEMENT_NODE) {
                        // If the target node is an element node, adjust accordingly
                        console.log("Element node");
                        // @ts-ignore
                        if ((targetNode.tagName.toLowerCase() === 'ul' || targetNode.tagName.toLowerCase() === 'ol') && targetNode.childNodes.length > 0) {
                            // If the target is a <ul>, use the first child node (presumably an <li>)
                            let elementTextCount = 1;
                            let elementNumber = 0;
                            let text_offset: number = 0;
                            let found = false;
                            for (var x = 0; x < targetNode.childNodes.length; x++) {
                                console.log("x:", x, "element:", targetNode.childNodes[x], "nodeType:", targetNode.childNodes[x].nodeType, "textContent:", targetNode.childNodes[x].textContent)
                                text_offset = 0;
                                for (var i = 0; i < targetNode.childNodes[x].textContent!.length; i++) {
                                    // console.log(elementTextCount, data.offset, targetNode.childNodes[x].textContent[i])
                                    if (elementTextCount == data.offset) {
                                        text_offset = i;
                                        found = true;
                                        break;
                                    }
                                    elementTextCount += 1;
                                }
                                elementNumber += 1;
                                if (found) break;
                                // console.log(elementNumber, elementTextCount)
                            }
                            // console.log(elementNumber-1, targetNode.childNodes[elementNumber-1], text_offset, data.offset)
                            targetNode = targetNode.childNodes[elementNumber-1];
                            data.offset = text_offset
                        // @ts-ignore
                        } else if ((targetNode.tagName.toLowerCase() === 'table') && targetNode.childNodes.length > 0) {
                            // If the target is a <table>, use the first child node (presumably a <tr>)
                            console.log("Table node ", targetNode);
                            let elementTextCount = 1;
                            let elementNumber = 0;
                            let rowNumber = 0;
                            let text_offset: number = 0;
                            let found = false;
                            targetNode = targetNode.firstChild!;
                            for (var x = 0; x < targetNode.childNodes.length; x++) {
                                elementNumber = 0;
                                for (var y = 0; y < targetNode.childNodes[x].childNodes.length; y++) {
                                    console.log("y:", y, "element:", targetNode.childNodes[x].childNodes[y], "nodeType:", targetNode.childNodes[x].childNodes[y].nodeType, "textContent:", targetNode.childNodes[x].childNodes[y].textContent)
                                    text_offset = 0;
                                    for (var i = 0; i < targetNode.childNodes[x].childNodes[y].textContent!.length; i++) {
                                        // console.log(elementTextCount, data.offset, targetNode.childNodes[x].textContent[i])
                                        if (elementTextCount == data.offset) {
                                            text_offset = i;
                                            found = true;
                                            break;
                                        }
                                        elementTextCount += 1;
                                    }
                                    elementNumber += 1;
                                    if (found) break;
                                }
                                rowNumber += 1;
                                if (found) break;
                            }
                            console.log(targetNode, rowNumber-1, elementNumber-1, targetNode.childNodes[rowNumber-1], targetNode.childNodes[rowNumber-1].childNodes[elementNumber-1], targetNode.childNodes[rowNumber-1].childNodes[elementNumber-1].textContent?.length)
                            targetNode = targetNode.childNodes[rowNumber-1].childNodes[elementNumber-1];
                            data.offset = text_offset
                        } else {
                            range.setStart(targetNode, 0);
                        }
                        console.log(targetNode, " textContent: ", targetNode.textContent, " offset: ", data.offset);

                        // Check if the target node has text content and is a valid text node
                        if (targetNode.firstChild && targetNode.firstChild.nodeType === Node.TEXT_NODE) {
                            const textNode = targetNode.firstChild;
                            // Ensure the offset does not exceed the length of the text content
                            const validOffset = Math.min(data.offset, textNode.textContent!.length);
                            range.setStart(textNode, validOffset);
                        }
                    } else {
                        console.error('Unsupported node type:', targetNode.nodeType);
                    }

                    range.collapse(true);
                    // Insert the span at the range
                    range.insertNode(span);
                    // Move the caret after the inserted span
                    range.setStartAfter(span);
                    range.collapse(true);
                    // Update the selection
                    sel.removeAllRanges();
                    sel.addRange(range);
                    console.log(data.message.length, data.caretPos);
                    console.log(data.target, " + ", data.message[data.caretPos]);
                    console.log(editableDiv.innerHTML);

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


function splitHtmlStringToText(htmlString: string) {
    // Parse the HTML string into a DOM structure
    let parser = new DOMParser();
    let doc = parser.parseFromString(htmlString, 'text/html')
    // Get all elements in the body of the parsed document
    return splitElements(doc.body);
}

// Function to recursively get the text content of each element
function getTextContent(element: any): string {
    let textArray: string[] = [];
    element.childNodes.forEach((child: { nodeType: number; nodeValue: string; }) => {
        if (child.nodeType === Node.TEXT_NODE && child.nodeValue !== '') {
            textArray.push(child.nodeValue);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
            let childTextContent = getTextContent(child);
            if (childTextContent) {
                textArray.push(childTextContent);
            }
        }
    });
    return textArray.join('');
}

// Function to split HTML into individual elements and get their text content
function splitElements(element: any): string[] {
    let elementsArray: string[] = [];
    element.childNodes.forEach((child: { nodeType: number; nodeValue: string; }) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
            elementsArray.push(getTextContent(child));
        } else if (child.nodeType === Node.TEXT_NODE && child.nodeValue.trim() !== '') {
            elementsArray.push(child.nodeValue.trim());
        }
    });
    return elementsArray;
}