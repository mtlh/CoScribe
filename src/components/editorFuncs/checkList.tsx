import { getCaretCharOffset } from "./caretOffset";

export function checklist(para: string, checkboxStates: boolean[]): [string, boolean[]] {
    if (para.indexOf("<div>checklist&nbsp;</div>") > -1 || para == "checklist&nbsp;") {
        const editableDiv = document.getElementById('editableDiv')!;
        const caretPos = getCaretCharOffset(editableDiv);
        para = para.replace("checklist&nbsp;", "<input type='checkbox' class='checkbox'> <div></div></input>");
        editableDiv.innerHTML = para;
        const inputElements = editableDiv.querySelectorAll('input.checkbox');
        if (checkboxStates.length != inputElements.length) {
            while (checkboxStates.length < inputElements.length) {
                checkboxStates.push(false);
            }
        }
        inputElements.forEach((input, index) => {
            // Set checkbox state based on the stored state
            // @ts-ignore
            input.checked = checkboxStates[index];

            // Add event listener to update state on change
            input.addEventListener('change', () => {
                // @ts-ignore
                checkboxStates[index] = input.checked;
            });
        });

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
    return [para, checkboxStates];
}