import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongCredentialsDialogComponent } from './wrong-credentials-dialog.component';

describe('WrongCredentialsDialogComponent', () => {
  let component: WrongCredentialsDialogComponent;
  let fixture: ComponentFixture<WrongCredentialsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongCredentialsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongCredentialsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
