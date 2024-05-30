import { getCaretCharOffset } from "./caretOffset";
import { getChildrenAndHighlightCaret } from "./getChildrenHighlight";
import { persistState } from "./persistState";

// function getStringDifferences(str1: string, str2: string) {
//     let minLength = Math.min(str1.length, str2.length);
//     let result = '';
//     for (let i = 0; i < minLength; i++) {
//         if (str1[i] != str2[i]) {
//            result += str1[i];
//         }
//     }

//     return result;
// }


export function checklist(para: string, checkboxStates: boolean[], currentPara: string): [string, boolean[]] {

    const editableDiv = document.getElementById('editableDiv')!;
    const caretPos = getCaretCharOffset(editableDiv);

    let { children, caretChildIndex } = getChildrenAndHighlightCaret(editableDiv);
    console.log("Child elements:", children);
    console.log("Index of highlighted child:", caretChildIndex);

    // console.log(children[caretChildIndex].outerHTML, children[caretChildIndex-1].outerHTML.includes(`<input type="checkbox" class="checkbox">`))
    if (children && caretChildIndex > 0) {
      if (/<div[^>]*><br><\/div>/.test(children[caretChildIndex].outerHTML) && children[caretChildIndex-1].outerHTML.includes(`<input type="checkbox" class="checkbox">`)) { 
        const newElement = document.createElement("div");
        const newInput = document.createElement("input");
        newInput.setAttribute("type", "checkbox");
        newInput.setAttribute("class", "checkbox");
        newElement.appendChild(newInput);
        newElement.appendChild(document.createElement("div"));
        editableDiv.replaceChild(newElement, children[caretChildIndex]);
        persistState(editableDiv, checkboxStates);
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(newElement, 1);
        range.collapse(true);
        selection!.removeAllRanges();
        selection!.addRange(range);
      }
    }

    // if (getStringDifferences(para, currentPara).substring(0,2) == "br") {
    //     // Define the regex pattern to match the specific structure with <br> inside
    //     let pattern1 = /(<input type="checkbox" class="checkbox">.*?<\/div><div>)<br>(<\/div>)/;
    //     const pattern2 = /<input type="checkbox" class="checkbox">(.*?)<\/div><div><br><\/div>/g;
    //     const matches = [];
    //     let match;
    //     while ((match = pattern2.exec(para)) !== null) {
    //         matches.push(match[1]);
    //     }
    //     console.log(matches, para.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")[caretPos-1], matches[0].substring(matches[0].length-1, matches[0].length))
    //     if (matches.length > 0 && para.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")[caretPos-1] == matches[0].substring(matches[0].length-1, matches[0].length)) {
    //         // Replace <br> with <input type="checkbox" class="checkbox">
    //         let newString = para.replace(pattern1, "$1<input type='checkbox' class='checkbox'> <div></div></input>$2");
    //         if (newString != para) {
    //             editableDiv.innerHTML = newString;
    //             persistState(editableDiv, checkboxStates);
    //             const inputElements = editableDiv.querySelectorAll('input.checkbox');
    //             if (inputElements.length > 0) {
    //                 let inputIndex = 0;
    //                 for (let i = 0; i < inputElements.length; i++) {
    //                     const inputPosition = getCaretCharOffset(inputElements[i]);
    //                     if (caretPos > inputPosition) {
    //                         inputIndex = i + 1;
    //                     } else {
    //                         break;
    //                     }
    //                 }
    //                 const range = document.createRange();
    //                 range.setStartAfter(inputElements[Math.min(inputIndex, inputElements.length - 1)]);
    //                 range.collapse(true);
    //                 const sel = window.getSelection()!;
    //                 sel.removeAllRanges();
    //                 sel.addRange(range);
    //                 editableDiv.focus();
    //             } else {
    //                 console.error("No <input> elements found after replacing 'checklist&nbsp;'");
    //             }
    //         }
    //     }
    // }

    if (para == "checklist&nbsp;") {
        editableDiv.innerHTML = "<div><input type='checkbox' class='checkbox'></div>";
        para = "";
        persistState(editableDiv, checkboxStates);
        return [para, checkboxStates];
    }

    if (children.length > 0) {
        if (caretChildIndex == -1) {
            caretChildIndex = children.length - 1;
        }
        if (/<div[^>]*>checklist&nbsp;<\/div>/.test(children[caretChildIndex].outerHTML)) {
            const newElement = document.createElement("div");
            newElement.innerHTML = "<input type='checkbox' class='checkbox'> <div></div></input>";
            editableDiv.replaceChild(newElement, children[caretChildIndex]);
            persistState(editableDiv, checkboxStates);
            const inputElements = editableDiv.querySelectorAll('input.checkbox');
            if (inputElements.length > 0) {
                let inputIndex = 0;
                for (let i = 0; i < inputElements.length; i++) {
                    const inputPosition = getCaretCharOffset(inputElements[i]);
                    if (caretPos > inputPosition) {
                        inputIndex = i + 1;
                    } else {
                        break;
                    }
                }
                const range = document.createRange();
                range.setStartAfter(inputElements[Math.min(inputIndex, inputElements.length - 1)]);
                range.collapse(true);
                const sel = window.getSelection()!;
                sel.removeAllRanges();
                sel.addRange(range);
                editableDiv.focus();
            } else {
                console.error("No <input> elements found after replacing 'checklist&nbsp;'");
            }
        }
    }
    return [para, checkboxStates];
}