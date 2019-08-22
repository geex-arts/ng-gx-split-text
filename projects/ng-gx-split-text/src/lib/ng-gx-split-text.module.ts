import { NgModule } from '@angular/core';
import { NgGxSplitTextComponent } from './components/ng-gx-split-text/ng-gx-split-text.component';
import { NgGxSplitTextDirective } from './directives/ng-gx-split-text.directive';
import { NgGxSplitTextService } from './services/ng-gx-split-text.service';


@NgModule({
  declarations: [
    NgGxSplitTextComponent,
    NgGxSplitTextDirective,
  ],
  imports: [],
  exports: [
    NgGxSplitTextComponent,
  ],
  providers: [
    NgGxSplitTextService,
  ]
})
export class NgGxSplitTextModule {
}
