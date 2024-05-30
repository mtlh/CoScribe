import { getCaretCharOffset } from "./caretOffset";
import { getChildrenAndHighlightCaret } from "./getChildrenHighlight";
import { persistState } from "./persistState";

export function table(para: string, checkboxStates: boolean[]) {
    const editableDiv = document.getElementById('editableDiv')!;
    const caretPos = getCaretCharOffset(editableDiv);
    const { children, caretChildIndex } = getChildrenAndHighlightCaret(editableDiv);

    if (para == "table&nbsp;") {
        editableDiv.innerHTML = "<table class='table'><tr><td>table</td></tr></table>";
        para = "";
        persistState(editableDiv, checkboxStates);
        return [para, checkboxStates];
    }

    if (children.length > 0) {
        console.log(children, children[caretChildIndex], children[caretChildIndex].outerHTML)

        if (/<div[^>]*>table&nbsp;<\/div>/.test(children[caretChildIndex].outerHTML)) {
            const newElement = document.createElement('table');
            newElement.classList.add('table');
            newElement.innerHTML = "<tr><td></td></tr>";
            editableDiv.replaceChild(newElement, children[caretChildIndex]);
            persistState(editableDiv, checkboxStates);

            const tableElements = editableDiv.querySelectorAll('table.table');
            if (tableElements.length > 0) {
                let tableIndex = 0;
                for (let i = 0; i < tableElements.length; i++) {
                    const ulPosition = getCaretCharOffset(tableElements[i]);
                    if (caretPos > ulPosition) {
                        tableIndex = i + 1;
                    } else {
                        break;
                    }
                }
                const range = document.createRange();
                range.setStartBefore(tableElements[Math.min(tableIndex, tableElements.length - 1)]);
                range.collapse(true);
                const sel = window.getSelection()!;
                sel.removeAllRanges();
                sel.addRange(range);
                editableDiv.focus();
            } else {
                console.error("No <table> elements found after replacing 'table&nbsp;'");
            }
        }

        if (children[caretChildIndex].outerHTML.includes("insertrow&nbsp;")) {
            // add a new row to existing table
            try{
                // @ts-ignore
                const newRow = children[caretChildIndex].insertRow(-1)
                newRow.innerHTML = "<td></td>";
            } catch (e) {
                console.error(e)
            }
            const newElement = document.createElement('table');
            newElement.classList.add('table');
            newElement.innerHTML = children[caretChildIndex].innerHTML.replace("insertcol&nbsp;", "");;
            editableDiv.replaceChild(newElement, children[caretChildIndex]);
            persistState(editableDiv, checkboxStates);
        }

        if (children[caretChildIndex].outerHTML.includes("insertcol&nbsp;")) {
            // add a new row to existing table
            try{
                // @ts-ignore
                for (let i = 0; i < children[caretChildIndex].rows.length; i++) {
                    try {
                        // @ts-ignore
                        const newCol = children[caretChildIndex].rows[i].insertCell(-1)
                        newCol.innerHTML = "<td></td>";
                    } catch (e) {
                        console.error(e)
                    }
                }
            }catch (e) {
                console.error(e)
            }
            const newElement = document.createElement('table');
            newElement.classList.add('table');
            newElement.innerHTML = children[caretChildIndex].innerHTML.replace("insertcol&nbsp;", "");;
            editableDiv.replaceChild(newElement, children[caretChildIndex]);
            persistState(editableDiv, checkboxStates);
        }
    }
}