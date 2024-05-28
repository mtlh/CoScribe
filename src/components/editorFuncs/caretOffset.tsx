export function getCaretCharOffset(element: any) {
    var caretOffset = 0;
    if (window.getSelection) {
      var range = window.getSelection()!.getRangeAt(0);
      var preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    } 
    // @ts-ignore
    else if (document!.selection && document.selection.type != "Control") {
      // @ts-ignore
      var textRange = document.selection.createRange();
      // @ts-ignore
      var preCaretTextRange = document.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}