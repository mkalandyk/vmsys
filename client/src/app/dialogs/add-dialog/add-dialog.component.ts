import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { VendingMachineAddComponent } from 'src/app/components/vending-machine-add/vending-machine-add.component';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  @ViewChild(VendingMachineAddComponent) child: VendingMachineAddComponent;

  constructor() { }

  ngOnInit() {
  }
}
