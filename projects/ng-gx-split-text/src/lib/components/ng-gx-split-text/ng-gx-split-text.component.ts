import {AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren} from '@angular/core';

// TODO: lib-ng-gx-split-text or ng-gx-split-text
@Component({
  selector: 'lib-ng-gx-split-text',
  templateUrl: './ng-gx-split-text.component.html',
  styleUrls: ['./ng-gx-split-text.component.scss']
})
export class NgGxSplitTextComponent implements OnInit, AfterViewInit {
  @Input() textContent: string;
  @Input() willChange: string;
  @Input() wordsOfChars: string[][];

  @ViewChildren('split_text_word') splitTextWord = new QueryList<ElementRef>();
  @ViewChildren('split_text_char') splitTextChar = new QueryList<ElementRef>();

  // splitTextItem = {
  // TODO: add types
  words = [];
  chars = [];
  lineWords = [];
  lineChars = [];

  // };

  constructor() {
  }

  ngOnInit(): void {
    console.log('ngOnInit', this.textContent);
    this.wordsOfChars = this.createTextArray(this.textContent);
    // this.words = this.splitTextWord.map(word => word.nativeElement);
    // this.chars = this.splitTextChar.map(char => char.nativeElement);

    // TODO: make immutable
    // this.lineWords = this.getLine(this.words);
    // this.getLine(this.words, this.lineWords);
    // this.lineChars = this.getLine(this.chars);
    // this.getLine(this.chars, this.lineChars);
  }


  // TODO: Add updating lines on resize

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', this.textContent);
    // this.wordsOfChars = this.createTextArray(this.textContent);
    this.words = this.splitTextWord.map(word => word.nativeElement);
    this.chars = this.splitTextChar.map(char => char.nativeElement);
    //
    // // TODO: make immutable
    // // this.lineWords = this.getLine(this.words);
    this.getLine(this.words, this.lineWords);
    // // this.lineChars = this.getLine(this.chars);
    this.getLine(this.chars, this.lineChars);
  }

  createTextArray(textContent: string): string[][] {

    const words = textContent.split(' ');

    if (words[0] === '') {
      words.splice(0, 1);
    }

    if (words[words.length - 1] === '') {
      words.splice(words.length - 1, 1);
    }

    const textWithSpaces = words
      .map(item => [item, ' '])
      .reduce((a, b) => a.concat(b), [])
      .slice(0, -1);
    return textWithSpaces.map(item => item.split(''));
  }


  getLine(elements, lineElements) {
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
  }

}
