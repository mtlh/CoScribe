import { getCaretCharOffset } from "./caretOffset";
import { getChildrenAndHighlightCaret } from "./getChildrenHighlight";
import { persistState } from "./persistState";

export function bulletlist(para: string, checkboxStates: boolean[]): [string, boolean[]] {
    const editableDiv = document.getElementById('editableDiv')!;
    const caretPos = getCaretCharOffset(editableDiv);
    const { children, caretChildIndex } = getChildrenAndHighlightCaret(editableDiv);
    
    if (/<div[^>]*>-&nbsp;<\/div>/.test(children[caretChildIndex].outerHTML) || para == "-&nbsp;") {
        const newElement = document.createElement('ul');
        newElement.classList.add('list-disc');
        newElement.innerHTML = "<li></li>";
        editableDiv.replaceChild(newElement, children[caretChildIndex]);
        persistState(editableDiv, checkboxStates);

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
    return [para, checkboxStates];
}