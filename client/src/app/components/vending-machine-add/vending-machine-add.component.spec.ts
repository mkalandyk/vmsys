import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingMachineAddComponent } from './vending-machine-add.component';

describe('VendingMachineAddComponent', () => {
  let component: VendingMachineAddComponent;
  let fixture: ComponentFixture<VendingMachineAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendingMachineAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendingMachineAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
