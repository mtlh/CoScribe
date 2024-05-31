export function findHtmlIndexOfTextIndex(htmlString: string, textIndex: number, depth: number) {
        // Create a temporary DOM element to parse the HTML string
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;
    
        // Iterate through the HTML elements and match text positions
        var currentTextIndex = 0;
        var htmlIndex = -1;
        var found = false;
    
        function traverse(node: any) {
            if (found) return;
            if (node.nodeType === Node.TEXT_NODE) {
                for (var i = 0; i < node.nodeValue.length; i++) {
                    if (currentTextIndex === textIndex) {
                        // Find the position of the text node within the parent element's innerHTML
                        var parentHTML = node.parentNode.innerHTML;
                        console.log(node.parentNode.innerHTML, node.nodeValue[i]);
                        let occurences = 0
                        for (var j = 0; j < node.parentNode.innerHTML.length; j++) {
                            if (node.nodeValue[i] === node.parentNode.innerHTML[j]) {
                                occurences += 1
                            }
                            if (occurences === depth) {
                                htmlIndex = htmlString.indexOf(node.nodeValue[i], (htmlString.indexOf(parentHTML)+j));
                                found = true;
                                return;
                            }
                        }
                    }
                    currentTextIndex++;
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                for (var j = 0; j < node.childNodes.length; j++) {
                    traverse(node.childNodes[j]);
                    if (found) return;
                }
            }
        }
    
    traverse(tempDiv);
    return htmlIndex;
}

const findNthOccurence = (string: string, char: string, nth: number) => {
    let index = 0
    for (let i = 0; i < nth; i += 1) {
      if (index !== -1) index = string.indexOf(char, index + 1)
    }
    return index
  }