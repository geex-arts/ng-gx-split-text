import { NgModule } from '@angular/core';
import { NgGxSplitTextComponent } from './components/ng-gx-split-text/ng-gx-split-text.component';
import { NgGxSplitTextDirective } from './directives/ng-gx-split-text.directive';
import { NgGxSplitTextService } from './services/ng-gx-split-text.service';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    NgGxSplitTextComponent,
    NgGxSplitTextDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NgGxSplitTextComponent,
    NgGxSplitTextDirective,
  ],
  providers: [
    NgGxSplitTextService,
  ],
  entryComponents: [
    NgGxSplitTextComponent,
  ],
})
export class NgGxSplitTextModule {
}
