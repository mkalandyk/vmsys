import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingMachineListComponent } from './vending-machine-list.component';

describe('VendingMachineListComponent', () => {
  let component: VendingMachineListComponent;
  let fixture: ComponentFixture<VendingMachineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendingMachineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendingMachineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
