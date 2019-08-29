![GX](https://i.ibb.co/NjW67P4/gx.png)

![Split Text](https://media.giphy.com/media/MXL08fzkAr19LqhYNT/giphy.gif) 

**NG-GX-SPLIT-TEXT** - This is a utility for Angular, allowing you to split the text into words and chars, for subsequent animation  
  
You can familiarize yourself with the demo version at the link - [DEMO](https://geex-arts.github.io/ng-gx-split-text/demo/)  
  
## Versions  
  
| Angular        | ng-gx-split-text |  
|----------------|------------------|  
|>=8.0.0  <9.0.0 | v0.0.1           |

## Features

- [x] Split into chars
- [x] Split into words
- [x] Split into line-chars
- [x] Split into line-words
- [x] Defer init  


## Getting started
### Step 1: Install `ng-gx-split-text`:
```shell
npm install ng-gx-split-text
```

### Step 2: Import the NgGxSplitTextModule:
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

### Step 3: Add a directive and template variable (example: #text) to the text you want to split:
```html
<p #text ngGxSplitText>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet consequuntur culpa
  delectus, doloribus exercitationem ipsam, laudantium molestiae non numquam odit omnis optio praesentium quae ratione
  similique sit soluta voluptatem?</p>
```

### Step 3: Find template variable in your component using @ViewChild():
```js
  @ViewChild('text', {static: true, read: NgGxSplitTextDirective}) text: NgGxSplitTextDirective;
```

### Step 4: Animate text with [GSAP](https://greensock.com/gsap/):
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

### Example: [DEMO](https://geex-arts.github.io/ng-gx-split-text/demo/) 


## API
### Directives
| Name           |  Description |
| ------------- | ------------- |
| NgGxSplitText | Add Split Text for your text (all `options` is default) |
| [NgGxSplitText] | Add Split Text for your text (custom `options`)|

### Options
| Name           | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| defer | `boolean` | `false` |  Defer initiation (for manual initiation use `initSplit()`) |

#### Example:
```html
<p #text ngGxSplitText>Lorem ipsum dolor...</p> // Default options
<p #text [ngGxSplitText]="{defer: true, ...}">Lorem ipsum dolor...</p> // Custom options
```

```js
ngAfterViewInit(): void {
    // if Split Text already initialized (defer: false)
    this.text.initSplit(); // Return WARNING! Text already initialized
    
    // if Split Text not initialized (defer: true)
    this.text.initSplit(); // It's OK!
  }
```
---
### Properties
| Name           | Type   | Description |
| ------------- | ------------- | ------------- |
| isInit | `boolean`| Return init status  |
| nativeElement | `HTMLElement` | Return nativeElement |
| words | `HTMLElement[]` | Return words array |
| chars | `HTMLElement[]` | Return chars array |
| line-words | `HTMLElement[][]` | Return line array with words array |
| line-chars | `HTMLElement[][]` | Return line array with chars array |

### Methods
| Name           | Description |
| ------------- | ------------- |
| initSplit() |  Initialize Split Text (It will work if you select `defer: true`) |
| resetSplit() |  Reset to source text |


#### Example: 
```js
this.text.isInit // console.log(true);
this.text.srcText // console.log(Lorem ipsum dolor...);
```
