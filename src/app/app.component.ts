import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TimelineMax } from 'gsap';
import { NgGxSplitTextDirective } from '../../projects/ng-gx-split-text/src/lib/directives/ng-gx-split-text.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('text_one', {static: true, read: NgGxSplitTextDirective}) textOne: NgGxSplitTextDirective;

  ngAfterViewInit(): void {
    new TimelineMax()
      .staggerFrom(this.textOne.chars, 0.3, {
        opacity: 0,
        x: 100,
        y: 50,
        rotation: 30,
      }, 0.01)
      .add(() => {
        this.textOne.resetWillChange();
      });
  }
}
