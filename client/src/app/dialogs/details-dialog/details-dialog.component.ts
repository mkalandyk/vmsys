import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { VendingMachineService } from 'src/app/modules/vending-machine/vending-machine.service';
import { VendingMachineDetailsComponent } from 'src/app/components/vending-machine-details/vending-machine-details.component';
import {MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {

  @ViewChild(VendingMachineDetailsComponent) child: VendingMachineDetailsComponent;
  @Input() id;
  vendingMachine: any;

  constructor(
    private vendingMachineService: VendingMachineService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.loadData(this.data.machineId);
  }

  loadData(id) {
    this.child.loadData(id);
  }
}
