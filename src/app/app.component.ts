import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { Back } from 'gsap';
import { cards } from './stubs/cards';
import * as _ from 'lodash';
import { CardComponent } from './components/card/card.component';
import { TimelineMax } from 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChildren('card_component', {read: CardComponent}) cardComponent = new QueryList<CardComponent>();

  cards = cards;

  constructor() {
  }


  ngAfterViewInit(): void {
    this.initAnimations();
  }

  initAnimations() {
    this.textOneInitAnimation();
    this.textTwoInitAnimation();
    this.textThreeInitAnimation();
    this.textFourInitAnimation();
  }

  textOneInitAnimation() {
    const text = this.cardComponent.toArray()[0].text;
    const tlText = this.cardComponent.toArray()[0].tlText;
    tlText
      .to(text.chars, 0.5, {
        opacity: 0,
      })
      .staggerFromTo(text.chars, 0.5, {
        opacity: 0,
        x: 50,
        y: 50,
        rotation: 30,
        immediateRender: false,
      }, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        ease: Back.easeOut.config(1.7),
      }, 0.03).pause();
  }

  textTwoInitAnimation() {
    const text = this.cardComponent.toArray()[1].text;
    const tlText = this.cardComponent.toArray()[1].tlText;
    tlText
      .to(text.words, 0.5, {
        opacity: 0,
      })
      .staggerFromTo(text.words, 0.5, {
        opacity: 0,
        x: () => {
          const random = _.random(500, 500);
          console.log(random);
          return _.random(-100, 100);
        },
        y: () => {
          return _.random(-100, 100);
        },
        rotation: () => {
          return _.random(-25, 25);
        },
        immediateRender: false,
      }, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
      }, 0.03).pause();
  }

  textThreeInitAnimation() {
    const text = this.cardComponent.toArray()[2].text;
    const tlText = this.cardComponent.toArray()[2].tlText;
    const multiply = 0.65;


    text.lineChars.forEach((chars, index) => {
      tlText
        .add(
          new TimelineMax()
            .staggerFrom(chars, 0.8 * multiply, {
              opacity: 0,
              x: 10,
              y: 30,
              rotation: -10,
              skewX: 30,
              ease: Back.easeOut.config(5),
            }, 0.025 * multiply, '+=0'),
          index * 0.1 * Math.pow(1.1, (index + 1)) * multiply
        ).pause();
    });
  }

  textFourInitAnimation() {
    const text = this.cardComponent.toArray()[3].text;
    const tlText = this.cardComponent.toArray()[3].tlText;
    const multiply = 2;


    text.lineWords.forEach((words, index) => {
      tlText
        .add(
          new TimelineMax()
            .from(words, 0.8 * multiply, {
              opacity: 0,
              x: 130,
              y: 0,
              skewX: -20,
              ease: Back.easeOut.config(5),
            }, 0.025 * multiply),
          index * 0.1 * Math.pow(0.9, (index + 1)) * multiply
        ).pause();
    });
  }


}
