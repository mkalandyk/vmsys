import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingMachineDetailsComponent } from './vending-machine-details.component';

describe('VendingMachineDetailsComponent', () => {
  let component: VendingMachineDetailsComponent;
  let fixture: ComponentFixture<VendingMachineDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendingMachineDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendingMachineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
