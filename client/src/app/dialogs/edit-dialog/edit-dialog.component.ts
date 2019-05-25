import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { VendingMachineService } from 'src/app/modules/vending-machine/vending-machine.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { VendingMachineEditComponent } from 'src/app/components/vending-machine-edit/vending-machine-edit.component';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  @ViewChild(VendingMachineEditComponent) child: VendingMachineEditComponent;
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
