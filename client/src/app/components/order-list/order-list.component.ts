import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersServiceService } from 'src/app/modules/order-service/orders-service.service';
import { Observable } from 'rxjs';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

export interface TableElement {
  product: object;
  machines: object;
  totalQuantity: number;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  alive = true;
  displayedColumns: string[] = ['product', 'totalQuantity'];
  dataSource: MatTableDataSource<TableElement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderListService: OrdersServiceService) {
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
    this.orderListService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource<TableElement>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
