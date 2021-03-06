import { Component, OnInit, Input } from '@angular/core';
import { VendingMachineService } from '../../modules/vending-machine/vending-machine.service';

@Component({
  selector: 'app-vending-machine-details',
  templateUrl: './vending-machine-details.component.html',
  styleUrls: ['./vending-machine-details.component.css']
})
export class VendingMachineDetailsComponent implements OnInit {

  @Input() id;
  vendingMachine: any;

  constructor(private vendingMachineService: VendingMachineService) { }

  ngOnInit() {
  }

  loadData(id) {
    this.vendingMachineService.getMachineById(id).subscribe(data => {
      this.vendingMachine = data;
    });
  }

}
