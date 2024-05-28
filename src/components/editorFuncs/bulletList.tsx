import { getCaretCharOffset } from "./caretOffset";

export function bulletlist(para: string) {
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
    return para;
}