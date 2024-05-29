export function persistState(editableDiv: HTMLElement, checkboxStates: boolean[]) {
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
}