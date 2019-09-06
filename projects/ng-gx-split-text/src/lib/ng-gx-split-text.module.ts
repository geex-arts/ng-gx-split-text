import { NgModule } from '@angular/core';
import { NgGxSplitTextDirective } from './directives/ng-gx-split-text.directive';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    NgGxSplitTextDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NgGxSplitTextDirective,
  ],
})
export class NgGxSplitTextModule {
}
