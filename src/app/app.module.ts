import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgGxSplitTextModule } from '../../projects/ng-gx-split-text/src/lib/ng-gx-split-text.module';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    NgGxSplitTextModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
