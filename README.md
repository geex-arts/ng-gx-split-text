![Badge](https://img.shields.io/npm/v/ng-gx-split-text?style=flat-square)
![Badge](https://img.shields.io/npm/l/ng-gx-split-text?style=flat-square)

![GX](https://i.ibb.co/NjW67P4/gx.png)

![Split Text](https://media.giphy.com/media/MXL08fzkAr19LqhYNT/giphy.gif) 

**NG-GX-SPLIT-TEXT** - This is an Angular utility to split text into words, lines or chars for subsequent animations.  
  
You can familiarize yourself with the demo version here - [DEMO](https://geex-arts.github.io/ng-gx-split-text/demo/)  
  
## Versions  
| Angular        | ng-gx-split-text |  
|----------------|------------------|  
|>=8.0.0  <9.0.0 | v0.0.x           |

## Features

- [x] Split into chars
- [x] Split into words
- [x] Split into line-chars
- [x] Split into line-words
- [x] Defer init  


## Getting started
### Step 1: Install `ng-gx-split-text` ([npm](https://www.npmjs.com/package/ng-gx-split-text)):
```she
npm install ng-gx-split-text
```

### Step 2: Import NgGxSplitTextModule:
```js
import { NgGxSplitTextModule } from 'ng-gx-split-text';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgGxSplitTextModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Step 3: Add directive to HTML node you want to split and template ID to reference this Directive in Component (example: #text):
```html
<p #text ngGxSplitText>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet consequuntur culpa
  delectus, doloribus exercitationem ipsam, laudantium molestiae non numquam odit omnis optio praesentium quae ratione
  similique sit soluta voluptatem?</p>
```

### Step 4: Add @ViewChild to access node words, lines and chars by previously assigned ID:
```js
  @ViewChild('text', { static: true, read: NgGxSplitTextDirective }) text: NgGxSplitTextDirective;
```

### Step 5: Work with split text using @ViewChild (Example for [GSAP](https://greensock.com/gsap/)):
```js
export class AppComponent implements AfterViewInit {
  
  @ViewChild('text', {static: true, read: NgGxSplitTextDirective}) text: NgGxSplitTextDirective;
  
  tlText = new TimelineMax();
  
  constructor() {}
  
 ngAfterViewInit(): void {
    this.textAnimation();
  }

  textAnimation() {
    this.tlText
      .to(this.text.words, 0.5, {
        opacity: 0,
      })
      .staggerFromTo(this.text.words, 0.5, {
        opacity: 0,
        x: () => {
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
      }, 0.03);
  }
}
```
#[DEMO](https://geex-arts.github.io/ng-gx-split-text/demo/) 

## API
### Directives
| Name           |  Description |
| ------------- | ------------- |
| NgGxSplitText | Split your text (all `options` is default) |
| [NgGxSplitText] | Split your text (custom `options`)|

### Options
| Name           | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| defer | `boolean` | `false` |  Defer initiation (for manual initiation use `initSplit()`) |

#### Example:
```html
<p #text ngGxSplitText>Lorem ipsum dolor...</p> // Default options
<p #text [ngGxSplitText]="{defer: true, ...}">Lorem ipsum dolor...</p> // Custom options
```

### Properties
| Name           | Type   | Description |
| ------------- | ------------- | ------------- |
| isInit | `boolean`| Is Split Text applied  |
| nativeElement | `HTMLElement` | Container HTMLElement |
| words | `HTMLElement[]` | Words HTMLElement array |
| chars | `HTMLElement[]` | Chars HTMLElement array |
| line-words | `HTMLElement[][]` | Line array with words HTMLElement array |
| line-chars | `HTMLElement[][]` | Line array with chars HTMLElement array |

#### Example: 
```js
this.text.isInit // console.log(true);
this.text.srcText // console.log(Lorem ipsum dolor...);
```

### Methods
| Name           | Description |
| ------------- | ------------- |
| initSplit() |  Initialize Split Text (For using in case `defer: true`) |
| resetSplit() |  Reset to source text |

#### Example:
```js
ngAfterViewInit(): void {
    // if Split Text already initialized (defer: false)
    this.text.initSplit(); // Return WARNING! Text already initialized
    
    // if Split Text not initialized (defer: true)
    this.text.initSplit(); // It's OK!
  }
```
