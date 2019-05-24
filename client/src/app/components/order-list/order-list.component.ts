import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersServiceService } from 'src/app/modules/order-service/orders-service.service';
import { Observable } from 'rxjs';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderListService: OrdersServiceService) {
    this.activeTab = 0;
    Observable.timer(0, 10000)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.getData();
    });
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getData() {
    if (this.activeTab === 0) {
      this.orderListService.getAllP().subscribe(data => {
        this.dataSourceP = new MatTableDataSource<TableElementP>(data);
        this.dataSourceP.paginator = this.paginator;
        this.dataSourceP.sort = this.sort;
      });
    } else {
      this.orderListService.getAllM().subscribe(data => {
        this.dataSourceM = new MatTableDataSource<TableElementM>(data);
        this.dataSourceM.paginator = this.paginator;
        this.dataSourceM.sort = this.sort;
      });
    }
  }

  switchTab($event) {
    this.activeTab = $event.index;
    this.getData();
  }
}
