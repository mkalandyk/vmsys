import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersServiceService } from 'src/app/modules/order-service/orders-service.service';
import { Observable } from 'rxjs';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';

export interface TableElementP {
  product: object;
  machines: object;
  totalQuantity: number;
}

export interface TableElementM {
  machine: object;
  products: object;
  totalQuantity: number;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  activeTab = 0;
  alive = true;
  displayedColumnsP: string[] = ['product', 'totalQuantity'];
  dataSourceP: MatTableDataSource<TableElementP>;
  displayedColumnsM: string[] = ['machineId', 'machineAddress', 'totalQuantity'];
  dataSourceM: MatTableDataSource<TableElementM>;

  @ViewChild('paginatorM') paginatorM: MatPaginator;
  @ViewChild('paginatorP') paginatorP: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private orderListService: OrdersServiceService,
    private router: Router) {
    this.activeTab = 0;
    Observable.timer(0, 10000)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.getData();
    });
  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user')) === null ) {
      this.router.navigate(['forbidden']);
    }
    this.getData();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getData() {
    if (this.activeTab === 0) {
      this.orderListService.getAllP().subscribe(data => {
        this.dataSourceP = new MatTableDataSource<TableElementP>(data);
        this.dataSourceP.paginator = this.paginatorP;
        this.dataSourceP.sort = this.sort;
      });
    } else {
      this.orderListService.getAllM().subscribe(data => {
        this.dataSourceM = new MatTableDataSource<TableElementM>(data);
        this.dataSourceM.paginator = this.paginatorM;
        this.dataSourceM.sort = this.sort;
      });
    }
  }

  switchTab($event) {
    this.activeTab = $event.index;
    this.getData();
  }
}
