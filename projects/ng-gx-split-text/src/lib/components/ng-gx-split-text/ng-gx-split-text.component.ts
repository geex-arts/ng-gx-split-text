import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Options } from '../../models/options';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'ng-gx-split-text',
  templateUrl: './ng-gx-split-text.component.html',
  styleUrls: ['./ng-gx-split-text.component.scss']
})

export class NgGxSplitTextComponent implements OnInit, AfterViewInit {
  @Input() textContent: string;
  @Input() options: Options;

  willChange: string;
  wordsOfChars: string[][];

  @ViewChildren('split_text_word') splitTextWord = new QueryList<ElementRef<HTMLElement>>();
  @ViewChildren('split_text_char') splitTextChar = new QueryList<ElementRef<HTMLElement>>();

  words: HTMLElement[] = [];
  chars: HTMLElement[] = [];
  lineWords: HTMLElement[] = [];
  lineChars: HTMLElement[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.willChange = this.options.willChange.join(', ');
    this.wordsOfChars = this.createTextArray(this.textContent);
  }

  ngAfterViewInit(): void {
    this.setElements();
    this.updateOnResize();
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

  getLine(elements) {
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
        this.setElements();
      });
  }

  setElements() {
    this.words = this.splitTextWord.map(word => word.nativeElement);
    this.chars = this.splitTextChar.map(char => char.nativeElement);
    this.lineWords = this.getLine(this.words);
    this.lineChars = this.getLine(this.chars);
  }

}
