import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingMachineEditComponent } from './vending-machine-edit.component';

describe('VendingMachineEditComponent', () => {
  let component: VendingMachineEditComponent;
  let fixture: ComponentFixture<VendingMachineEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendingMachineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendingMachineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
