import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { VendingMachineService } from 'src/app/modules/vending-machine/vending-machine.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import { WarehouseServiceService } from 'src/app/modules/warehouse-service/warehouse-service.service';

export interface TableElement {
  product: object;
  quantity: number;
  vendingMachineId: number;
}

@Component({
  selector: 'app-vending-machine-edit',
  templateUrl: './vending-machine-edit.component.html',
  styleUrls: ['./vending-machine-edit.component.css']
})
export class VendingMachineEditComponent implements OnInit {

  @Input() id;
  vendingMachine: any;
  displayedColumns: string[] = ['productId', 'name', 'quantity', 'update'];
  dataSource: MatTableDataSource<TableElement>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private vendingMachineService: VendingMachineService,
    private warehouseService: WarehouseServiceService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  loadData(id) {
    this.vendingMachineService.getMachineById(id).subscribe(data => {
      this.vendingMachine = data;
      this.dataSource = new MatTableDataSource<TableElement>(data.machineContent);
      this.dataSource.sort = this.sort;
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

  onRowSaveClicked(product) {
    // TODO: update only row state
  }

  onRowRemoveClicked(content) {
    this.vendingMachine.machineContent.splice(this.vendingMachine.machineContent.indexOf(content), 1);
    this.dataSource = new MatTableDataSource<TableElement>(this.vendingMachine.machineContent);
    this.dataSource.sort = this.sort;
  }

  onAddClicked() {
    const content = {product: {}, quantity: 0, vendingMachineId: this.vendingMachine.vendingMachineId};
    this.vendingMachine.machineContent.push(content);
    this.dataSource = new MatTableDataSource<TableElement>(this.vendingMachine.machineContent);
  }
}
