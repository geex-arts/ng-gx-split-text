import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TimelineMax } from 'gsap';
import { NgGxSplitTextDirective } from '../../../../projects/ng-gx-split-text/src/lib/directives/ng-gx-split-text.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {
  @Input() cardName: string;
  @Input() cardText: string;

  @ViewChild('text', {static: true, read: NgGxSplitTextDirective}) text: NgGxSplitTextDirective;
  @ViewChild('split_text_progress', {static: true}) splitTextProgress: ElementRef<HTMLElement>;

  tlText = new TimelineMax({
    onUpdate: () => {
      this.splitTextProgress.nativeElement.style.transform = `scaleX(${this.tlText.progress()})`;
    }
  });
  textReverse = false;
  textSlowMotion = false;
  textPause = true;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  textPlayAnimation() {
    this.textPause = false;
    this.cd.detectChanges();
    this.tlText.resume();
  }

  textReverseAnimation() {
    this.textReverse = !this.textReverse;
    this.cd.markForCheck();
    this.tlText.reversed(this.textReverse);
  }

  textPauseAnimation() {
    this.textPause = true;
    this.cd.detectChanges();
    this.tlText.pause();
  }

  textResetAnimation() {
    this.textReverse = false;
    this.textPause = true;
    this.cd.detectChanges();
    this.tlText.pause().progress(0).reversed(this.textReverse);
  }

  textSlowMoAnimation() {
    this.textSlowMotion = !this.textSlowMotion;
    this.cd.detectChanges();
    let timeScale = 1;
    if (this.textSlowMotion) {
      timeScale = 0.2;
    } else {
      timeScale = 1;
    }
    this.tlText.timeScale(timeScale);
  }

}
