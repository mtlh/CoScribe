export function getChildrenAndHighlightCaret(editableDiv: HTMLElement) {
    if (!editableDiv) {
        return { children: [], caretChildIndex: -1 };
    }
    const children = Array.from(editableDiv.children);
    const selection = window.getSelection();
    let caretChildIndex = -1;
    children.forEach((child, index) => {
        if (caretChildIndex === -1 && selection!.containsNode(child, true)) {
            caretChildIndex = index;
        }
    });
    return { children, caretChildIndex };
  }