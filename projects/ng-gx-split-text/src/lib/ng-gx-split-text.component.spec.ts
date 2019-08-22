import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgGxSplitTextComponent } from './ng-gx-split-text.component';

describe('NgGxSplitTextComponent', () => {
  let component: NgGxSplitTextComponent;
  let fixture: ComponentFixture<NgGxSplitTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgGxSplitTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgGxSplitTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
