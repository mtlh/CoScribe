import { getCaretCharOffset } from "./caretOffset";
import { persistState } from "./persistState";

export function numberlist(para: string, checkboxStates: boolean[]): [string, boolean[]] {
    if (para.indexOf("<div>1.&nbsp;</div>") > -1 || para == "1.&nbsp;") {
        const editableDiv = document.getElementById('editableDiv')!;
        const caretPos = getCaretCharOffset(editableDiv);
        console.log(caretPos);
        para = para.replace("1.&nbsp;", "<ol class='list-decimal'><li></li></ol>");
        editableDiv.innerHTML = para;
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
    return [para, checkboxStates];
}