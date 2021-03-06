import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { VendingMachineService } from 'src/app/modules/vending-machine/vending-machine.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ProductServiceService } from 'src/app/modules/product-service/product-service.service';

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
  }

  loadData(id) {
    this.productService.getAll().subscribe(data => {
      this.productsList = [];
      this.productsListFull = data;
      const listofUsedProducts = [];
      this.vendingMachineService.getMachineById(id).subscribe(machineData => {
        this.vendingMachine = machineData;
        this.dataSource = new MatTableDataSource<TableElement>(machineData.machineContent);
        this.dataSource.sort = this.sort;
        this.vendingMachine.machineContent.forEach(element => {
          this.productsListFull.forEach(prod => {
            if (prod.name === element.product.name) {
              listofUsedProducts.push(prod);
            }
          });
        });
        this.productsListFull.forEach(element => {
          if (!listofUsedProducts.includes(element)) {
            this.productsList.push(element);
          }
        });
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
