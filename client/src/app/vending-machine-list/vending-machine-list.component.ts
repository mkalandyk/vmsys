import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VendingMachineService } from '../shared/vending-machine/vending-machine.service';

declare let L;

@Component({
  selector: 'app-vending-machine-list',
  templateUrl: './vending-machine-list.component.html',
  styleUrls: ['./vending-machine-list.component.css']
})
export class VendingMachineListComponent implements OnInit {

  @Output() addPin = new EventEmitter();
  vendingMachines: Array<any>;

  constructor(private vendingMachineService: VendingMachineService) { }

  ngOnInit() {
    this.vendingMachineService.getAll().subscribe(data => {
      this.vendingMachines = data;
    });
  }

  onDetailsClick(address) {
    this.addPin.emit(address);
  }
}
