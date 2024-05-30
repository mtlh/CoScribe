import { getCaretCharOffset } from "./caretOffset";
import { getChildrenAndHighlightCaret } from "./getChildrenHighlight";
import { persistState } from "./persistState";

export function numberlist(para: string, checkboxStates: boolean[]): [string, boolean[]] {
    const editableDiv = document.getElementById('editableDiv')!;
    let { children, caretChildIndex } = getChildrenAndHighlightCaret(editableDiv);

    if (para == "1.&nbsp;") {
        editableDiv.innerHTML = "<ol class='list-decimal'><li></li></ol>";
        para = "";
        persistState(editableDiv, checkboxStates);
        return [para, checkboxStates];
    }
    
    if (children.length > 0) {
        if (caretChildIndex == -1) {
            caretChildIndex = children.length - 1;
        }
        if (/<div[^>]*>1.&nbsp;<\/div>/.test(children[caretChildIndex].outerHTML)) {
            const caretPos = getCaretCharOffset(editableDiv);
            const newElement = document.createElement('ol');
            newElement.classList.add('list-decimal');
            newElement.innerHTML = "<li></li>";
            editableDiv.replaceChild(newElement, children[caretChildIndex]);
            persistState(editableDiv, checkboxStates);
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
    }
    return [para, checkboxStates];
}