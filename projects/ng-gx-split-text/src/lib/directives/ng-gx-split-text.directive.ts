import { AfterContentChecked, AfterViewInit, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, Input, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { NgGxSplitTextComponent } from '../components/ng-gx-split-text/ng-gx-split-text.component';
import { defaults } from '../utils/defaults/defaults';
import { Options } from '../models/options';
import { defaultOptions } from '../models/default-options';

@Directive({
  selector: '[ngGxSplitText], ngGxSplitText'
})

export class NgGxSplitTextDirective implements OnInit, AfterViewInit, AfterContentChecked {
  @Input('ngGxSplitText') options: Options;

  private srcTextContent: string;
  private init = false;
  private componentRef: ComponentRef<NgGxSplitTextComponent>;
  private currentOptions: Options;

  constructor(
    private el: ElementRef<HTMLElement>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.setCurrentOptions();
  }

  ngAfterViewInit(): void {
    if (!this.currentOptions.defer) {
      this.initSplit();
    }
  }

  ngAfterContentChecked(): void {
    // TODO: add structure directive
  }

  public initSplit() {
    if (this.init) {
      console.warn('Warning!');
      return;
    }
    this.init = true;
    this.saveSrcText();
    this.createSplitTextComponent(this.el.nativeElement.textContent);
  }

  private saveSrcText() {
    this.srcTextContent = this.el.nativeElement.textContent;
  }

  private createSplitTextComponent(textContent) {
    this.el.nativeElement.innerHTML = '';

    const factory = this.componentFactoryResolver.resolveComponentFactory(NgGxSplitTextComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);

    this.renderer.appendChild(this.el.nativeElement, componentRef.location.nativeElement);

    componentRef.instance.textContent = textContent;
    componentRef.instance.options = this.currentOptions;
    componentRef.changeDetectorRef.detectChanges();

    this.componentRef = componentRef;
  }

  public get words() {
    if (!this.componentRef) {
      return;
    }
    return this.componentRef.instance.words;
  }

  public get lineWords() {
    if (!this.componentRef) {
      return;
    }
    return this.componentRef.instance.lineWords;
  }

  public get chars() {
    if (!this.componentRef) {
      return;
    }
    return this.componentRef.instance.chars;
  }

  public get lineChars() {
    if (!this.componentRef) {
      return;
    }
    return this.componentRef.instance.lineChars;
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

  // public resetWillChange() {
  //   if (!this.componentRef) {
  //     return;
  //   }
  //   this.words.forEach(word => word.style.willChange = 'auto');
  //   this.chars.forEach(char => char.style.willChange = 'auto');
  // }

  setCurrentOptions() {
    this.currentOptions = defaults(this.options, defaultOptions);
  }
}
