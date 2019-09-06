import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';
import { defaults } from '../utils/defaults/defaults';
import { Options } from '../models/options';
import { defaultOptions } from '../models/default-options';
import { SplitNodes } from '../utils/split-nodes/split-nodes';

@Directive({
  selector: '[ngGxSplitText], ngGxSplitText'
})

export class NgGxSplitTextDirective implements OnInit, AfterViewInit {
  @Input('ngGxSplitText') options: Options;

  private srcTextContent: string;
  private init = false;
  private currentOptions: Options;
  private splitNodes: SplitNodes;

  constructor(
    private el: ElementRef<HTMLElement>,
  ) {
  }

  ngOnInit(): void {
    this.setCurrentOptions();
    this.initSplitNodes();
  }

  ngAfterViewInit(): void {
    if (!this.currentOptions.defer) {
      this.initSplit();
    }
  }

  public initSplit() {
    if (this.init) {
      console.warn('Warning! Text is already initialized');
      return;
    }
    this.init = true;
    this.saveSrcText();
    this.splitNodes.initSplitNodes();
  }

  private saveSrcText() {
    this.srcTextContent = this.el.nativeElement.innerHTML;
  }

  public get words() {
    return this.splitNodes.words;
  }

  public get lineWords() {
    return this.splitNodes.lineWords;
  }

  public get chars() {
    return this.splitNodes.chars;
  }

  public get lineChars() {
    return this.splitNodes.lineChars;
  }

  public get nativeElement() {
    return this.el.nativeElement;
  }

  public get srcText() {
    return this.srcTextContent;
  }

  public get isInit() {
    return this.init;
  }

  public resetSplit() {
    this.nativeElement.innerHTML = this.srcText;
  }

  private setCurrentOptions() {
    this.currentOptions = defaults(this.options, defaultOptions);
  }

  private initSplitNodes() {
    this.splitNodes = new SplitNodes(this.el.nativeElement.textContent, this.el.nativeElement);
  }
}
