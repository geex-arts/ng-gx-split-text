import {
  AfterContentChecked,
  AfterViewInit,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { NgGxSplitTextComponent } from '../components/ng-gx-split-text/ng-gx-split-text.component';
import { hasOwnProperty } from 'tslint/lib/utils';
import { log } from 'util';

export interface NgGxSplitTextOptions {
  willChange?: string[];
  counter?: number;
}

export const ngGxSplitTextDefaultOptions: NgGxSplitTextOptions = {
  willChange: ['transform'],
  counter: 10,
};

const objectProto = Object.prototype;

const hasOwnProperty = objectProto.hasOwnProperty;

function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

function defaults(object, ...sources) {
  object = Object(object);
  sources.forEach((source) => {
    if (source != null) {
      source = Object(source);
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          const value = object[key];
          if (value === undefined ||
            (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
            object[key] = source[key];
          }
        }
      }
    }
  });
  return object;
}



@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngGxSplitText], ngGxSplitText'
})
export class NgGxSplitTextDirective implements OnInit, AfterViewInit, AfterContentChecked {
  // TODO Add options (will change)

  @Input('ngGxSplitText') ngGxSplitTextOptions: NgGxSplitTextOptions;

  @Input() private defer = false;
  private src: string;
  private init = false;
  private ref: ComponentRef<NgGxSplitTextComponent>;
  objectProto = Object.prototype;

  // TODO: ElementRef TYPE
  constructor(
    private splitTextTarget: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {
    const a = defaults(this.ngGxSplitTextOptions, ngGxSplitTextDefaultOptions);
    console.log(a, 1111);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (!this.defer) {
      this.initSplit();
    }
  }

  ngAfterContentChecked(): void {
    // TODO: add structure directive
    // console.log('ngAfterContentChecked', this.);
  }

  public initSplit() {
    if (this.init) {
      console.warn('Warning!');
      return;
    }

    this.init = true;
    this.saveSrcText();
    this.createSplitTextComponent(this.splitTextTarget.nativeElement.textContent);
  }

  private saveSrcText() {
    this.src = this.splitTextTarget.nativeElement.textContent;
  }

  // TODO: move to component

  private createSplitTextComponent(textContent) {

    this.splitTextTarget.nativeElement.innerHTML = '';
    // this.viewContainerRef.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(NgGxSplitTextComponent);
    const ref = this.viewContainerRef.createComponent(factory);

    this.renderer.appendChild(this.splitTextTarget.nativeElement, ref.location.nativeElement);

    ref.instance.textContent = textContent;
    // ref.instance.willChange = this.ngGxSplitTextCurrentOptions.willChange.join(', ');
    ref.changeDetectorRef.detectChanges();

    this.ref = ref;
  }

  public get words() {
    if (!this.ref) {
      return;
    }
    return this.ref.instance.words;
  }

  public get lineWords() {
    if (!this.ref) {
      return;
    }
    return this.ref.instance.lineWords;
  }

  public get chars() {
    if (!this.ref) {
      return;
    }
    return this.ref.instance.chars;
  }

  public get lineChars() {
    if (!this.ref) {
      return;
    }
    return this.ref.instance.lineChars;
  }

  public get nativeElement() {
    return this.splitTextTarget.nativeElement;
  }

  public get srcText() {
    return this.src;
  }

  public get isInit() {
    return this.init;
  }

  resetWillChange() {
    if (!this.ref) {
      return;
    }
    this.words.forEach((word, index) => {
      word.style.willChange = 'auto';
    });
    this.chars.forEach((char, index) => {
      char.style.willChange = 'auto';
    });
  }


  // TODO: Add reset

}
