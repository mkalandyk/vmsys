import { Component, OnInit } from '@angular/core';
import { VendingMachineService } from '../shared/vending-machine/vending-machine.service';

@Component({
  selector: 'app-vending-machine-list',
  templateUrl: './vending-machine-list.component.html',
  styleUrls: ['./vending-machine-list.component.css']
})
export class VendingMachineListComponent implements OnInit {

  vendingMachines: Array<any>;

  constructor(private vendingMachineService: VendingMachineService) { }

  ngOnInit() {
    this.vendingMachineService.getAll().subscribe(data => {
      this.vendingMachines = data;
    });
  }
}
