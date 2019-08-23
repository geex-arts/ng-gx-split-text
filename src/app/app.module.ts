import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgGxSplitTextModule} from '../../projects/ng-gx-split-text/src/lib/ng-gx-split-text.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgGxSplitTextModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
