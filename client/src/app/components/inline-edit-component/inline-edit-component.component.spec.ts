import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineEditComponentComponent } from './inline-edit-component.component';

describe('InlineEditComponentComponent', () => {
  let component: InlineEditComponentComponent;
  let fixture: ComponentFixture<InlineEditComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineEditComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
