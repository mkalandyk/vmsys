import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ProductServiceService } from 'src/app/modules/product-service/product-service.service';
import { WarehouseServiceService } from 'src/app/modules/warehouse-service/warehouse-service.service';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, merge, Subject } from 'rxjs';
import { map } from 'leaflet';
import { Router } from '@angular/router';

export interface TableElement {
  productId: number;
  name: string;
  price: string;
}

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  activeTab = 0;
  displayedColumns: string[] = ['productId', 'name', 'price', 'update'];
  dataSource: MatTableDataSource<TableElement>;
  admin: boolean;
  address;
  needRefresh = false;
  dataCopy = [];
  alive = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productService: ProductServiceService,
    private warehouseService: WarehouseServiceService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router) {
      Observable.timer(0, 1000)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        if (this.needRefresh) {
          this.getData();
        }
    });
     }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user')) === null ) {
      this.router.navigate(['forbidden']);
    }
    this.admin = JSON.parse(localStorage.getItem('user')).role === 'admin';
    this.getData();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getData() {
    if (this.dataCopy.length === 0) {
      this.productService.getAll().subscribe(data => {
        this.dataSource = new MatTableDataSource<TableElement>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      this.warehouseService.getAll().subscribe(data => {
        this.address = data.address;
      });
    } else {
      this.dataSource = new MatTableDataSource<TableElement>(this.dataCopy);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    this.needRefresh = false;
  }

  onAddressSaveClicked() {
    this.warehouseService.updateAddress(this.address).subscribe(data => {
    });
  }

  onRowSaveClicked(product) {
    this.productService.updateProduct(product).subscribe(data => {
    });
  }

  onAddProductClicked() {
    const data = this.dataSource.data;
    let highestId = 0;
    data.forEach(d => {
      if ((d.productId) > highestId) {
        highestId = d.productId;
      }
    });
    const product = {productId: ++highestId, name: 'Enter name', price: 'Enter price'};
    data.push(product);
    this.dataCopy = data;
    this.needRefresh = true;
  }
}
