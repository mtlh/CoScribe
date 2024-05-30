import { getCaretCharOffset } from "./caretOffset";
import { getChildrenAndHighlightCaret } from "./getChildrenHighlight";
import { persistState } from "./persistState";

export function h1(para: string, checkboxStates: boolean[]) {

    const editableDiv = document.getElementById('editableDiv')!;
    const caretPos = getCaretCharOffset(editableDiv);
    const { children, caretChildIndex } = getChildrenAndHighlightCaret(editableDiv);

    if (para == "h1&nbsp;") {
        editableDiv.innerHTML = "<div class='h1'><br></div>";
        para = "";
        persistState(editableDiv, checkboxStates);
        return [para, checkboxStates];
    }

    if (children && caretChildIndex > 0) {
      if (/<div[^>]*>h1&nbsp;<\/div>/.test(children[caretChildIndex].outerHTML)) {
            const newElement = document.createElement('div');
            newElement.innerHTML = "<br>";
            newElement.classList.add('h1');
            editableDiv.replaceChild(newElement, children[caretChildIndex]);
            persistState(editableDiv, checkboxStates);
            const olElements = editableDiv.querySelectorAll('div.h1');
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
                console.error("No <div> elements found after replacing 'h1&nbsp;'");
            }
        }
    }

}