import { Component, OnInit, Input } from '@angular/core';
import { VendingMachineService } from 'src/app/modules/vending-machine/vending-machine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vending-machine-edit',
  templateUrl: './vending-machine-edit.component.html',
  styleUrls: ['./vending-machine-edit.component.css']
})
export class VendingMachineEditComponent implements OnInit {

  @Input() id;
  vendingMachine: any;

  constructor(
    private vendingMachineService: VendingMachineService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  loadData(id) {
    this.vendingMachineService.getMachineById(id).subscribe(data => {
      this.vendingMachine = data;
      console.log(data);
    });
  }

  onSaveClicked() {
    this.vendingMachine.billon_10 = 10;
    this.vendingMachine.billon_20 = 10;
    this.vendingMachine.billon_50 = 10;
    this.vendingMachine.billon_1 = 10;
    this.vendingMachine.billon_2 = 10;
    this.vendingMachine.billon_5 = 10;
    this.vendingMachineService.updateMachine(this.vendingMachine).subscribe(data => {
      if (data === true) {
        this.router.navigate(['admin-panel']);
      }
    });
  }

  onAddClicked() {
    this.vendingMachine.machineContent
    this.vendingMachineService.updateMachine(this.vendingMachine).subscribe(data => {
      if (data === true) {
        this.router.navigate(['admin-panel']);
      }
    });
  }
}
