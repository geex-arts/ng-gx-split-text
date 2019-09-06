import { fromEvent } from 'rxjs';

export class SplitNodes {

  constructor(
    private textContent: string,
    private el: HTMLElement,
  ) {
  }

  words: HTMLElement[] = [];
  chars: HTMLElement[] = [];
  lineWords: HTMLElement[] = [];
  lineChars: HTMLElement[] = [];

  wordsArray: HTMLElement[][] = [];
  nodes = [];

  nodeTypes = {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12
  };

  initSplitNodes() {
    this.splitNodes(this.el);
    this.initNewNodes();
    this.setLines();
    this.updateOnResize();
  }


  splitNodes(el) {
    for (let i = 0; i < el.childNodes.length; i++) {
      const node = el.childNodes[i];
      const tag = [this.nodeTypes.ELEMENT_NODE, this.nodeTypes.DOCUMENT_NODE, this.nodeTypes.DOCUMENT_FRAGMENT_NODE].indexOf(node.nodeType) !== -1;
      const text = [this.nodeTypes.TEXT_NODE, this.nodeTypes.CDATA_SECTION_NODE].indexOf(node.nodeType) !== -1;

      if (tag) {
        this.splitNodes(node);
      } else if (text) {
        const words = this.splitNodesIntoWords(node);

        const wordsArray = [];
        words.forEach(chars => {
          const wordSpan = document.createElement('span');
          wordSpan.classList.add('split-text-word');
          wordSpan.style.display = 'inline-block';

          chars.forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.classList.add('split-text-char');
            charSpan.style.display = 'inherit';
            charSpan.innerHTML = char;
            wordSpan.appendChild(charSpan);
            this.chars.push(charSpan);
          });

          wordsArray.push(wordSpan);
          this.words.push(wordSpan);
        });

        this.wordsArray.push(wordsArray);
        this.nodes.push(node);
      }
    }
  }

  initNewNodes() {
    this.nodes.forEach((node, index) => {
      this.wordsArray[index].forEach((word, idx) => {

        node.parentNode.insertBefore(word, node);

        const spaceSpan = document.createElement('span');
        spaceSpan.classList.add('split-text-space');
        spaceSpan.style.display = 'inline';
        spaceSpan.innerHTML = ' ';

        node.parentNode.insertBefore(spaceSpan, word.nextSibling);

        if (idx === this.wordsArray[index].length - 1) {
          node.remove();
        }
      });
    });
  }

  splitNodesIntoWords(word) {
    const words = word.textContent.split(' ');

    if (words[0] === '') {
      words.splice(0, 1);
    }

    if (words[words.length - 1] === '') {
      words.splice(words.length - 1, 1);
    }

    return words.map(item => item.split(''));
  }

  getLines(elements) {
    const lineElements = [];
    let line = [];
    let lineIndex = 0;

    elements.forEach((el, index) => {

      const firstElTop = elements[lineIndex].getBoundingClientRect().top;
      const lastElIndex = elements.length - 1;

      if (el.getBoundingClientRect().top === firstElTop) {
        line.push(el);
        if (index === lastElIndex) {
          lineElements.push(line);
        }
      } else {
        lineElements.push(line);
        lineIndex = index;
        line = [];
        line.push(el);
      }
    });

    return lineElements;
  }

  updateOnResize() {
    fromEvent<UIEvent>(window, 'resize')
      .subscribe(() => {
        this.setLines();
      });
  }

  setLines() {
    this.lineWords = this.getLines(this.words);
    this.lineChars = this.getLines(this.chars);
  }
}
