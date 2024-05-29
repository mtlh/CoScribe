export function toggleBold() {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const containsBold = range!.commonAncestorContainer!.parentElement!.tagName === 'B';
      if (containsBold) {
        document.execCommand('bold', false);
      } else {
        document.execCommand('bold', false,);
      }
    }
}

export function toggleItalic() {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const containsItalic = range!.commonAncestorContainer!.parentElement!.tagName === 'I';
      if (containsItalic) {
        document.execCommand('italic', false);
      } else {
        document.execCommand('italic', false,);
      }
    }
}

export function toggleUnderline() {
  const selection = window.getSelection();
  if (selection && selection.toString().length > 0) {
    const range = selection.getRangeAt(0);
    const containsItalic = range!.commonAncestorContainer!.parentElement!.tagName === 'u';
    if (containsItalic) {
      document.execCommand('underline', false);
    } else {
      document.execCommand('underline', false,);
    }
  }
}

export function makeHeading() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const parentElement = range.commonAncestorContainer.parentElement!;
      if (parentElement.classList.contains("h1")) {
        parentElement.classList.toggle("h1");
      } else {
        removeTextClasses(parentElement);
        parentElement.classList.add("h1");
      }
    }
}

export function makeBase() {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const parentElement = range.commonAncestorContainer.parentElement!;
    if (parentElement.classList.contains("text-base")) {
      parentElement.classList.toggle("text-base");
    } else {
      removeTextClasses(parentElement);
      parentElement.classList.add("text-base");
    }
  }
}

function removeTextClasses(element: HTMLElement) {
  element.classList.remove("h1");
  element.classList.remove("h2");
  element.classList.remove("h3");
  element.classList.remove("h4");
  element.classList.remove("h5");
  element.classList.remove("h6");
  element.classList.remove("text-base");
}