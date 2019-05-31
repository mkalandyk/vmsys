import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { VendingMachineService } from 'src/app/modules/vending-machine/vending-machine.service';
import { ProductServiceService } from 'src/app/modules/product-service/product-service.service';
import { Router } from '@angular/router';

export interface TableElement {
  product: object;
  quantity: number;
  vendingMachineId: number;
}

@Component({
  selector: 'app-vending-machine-add',
  templateUrl: './vending-machine-add.component.html',
  styleUrls: ['./vending-machine-add.component.css']
})
export class VendingMachineAddComponent implements OnInit {

  id: any;
  vendingMachine: any;
  productsList: any;
  productsListFull: any;
  displayedColumns: string[] = ['productId', 'name', 'quantity', 'update'];
  dataSource: MatTableDataSource<TableElement>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private vendingMachineService: VendingMachineService,
    private productService: ProductServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.getAll().subscribe(prodData => {
      this.productsList = prodData;
      this.productsListFull = prodData;
      this.vendingMachineService.getLastId().subscribe(data => {
        this.id = data + 1;
        this.vendingMachine = {
          machineId : this.id,
          address : 'Address',
          machineContent : [{product: {}, quantity: 0, vendingMachineId: this.id}],
          billon_10 : 10,
          billon_20 : 10,
          billon_50 : 10,
          billon_1 : 10,
          billon_2 : 10,
          billon_5 : 10,
        };
        this.dataSource = new MatTableDataSource<TableElement>(this.vendingMachine.machineContent);
        this.dataSource.sort = this.sort;
      });
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

  onRowSaveClicked(content) {
    console.log(content);
  }

  onRowRemoveClicked(content) {
    this.vendingMachine.machineContent.splice(this.vendingMachine.machineContent.indexOf(content), 1);
    this.dataSource = new MatTableDataSource<TableElement>(this.vendingMachine.machineContent);
    this.dataSource.sort = this.sort;
    this.productsList.push(this.findProduct(content.product.name));
  }

  onAddClicked() {
    const content = {product: {}, quantity: 0, vendingMachineId: this.vendingMachine.machineId};
    this.vendingMachine.machineContent.push(content);
    this.dataSource = new MatTableDataSource<TableElement>(this.vendingMachine.machineContent);
  }

  onProductChange(content, product) {
    const prevProd = content.product;
    if (!this.isEmpty(prevProd)) {
      const prodFromList = this.findProduct(prevProd.name);
      this.productsList.push(prodFromList);
    }
    const prod = this.findProduct(product);
    if (prod !== null) {
      content.product = prod;
      this.productsList.splice(this.productsList.indexOf(prod), 1);
    }
  }

  findProduct(name): any {
    let prod = null;
    this.productsListFull.forEach(product => {
      if (product.name === name) {
        prod = product;
      }
    });
    return prod;
  }

  isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

}
