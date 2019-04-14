import { Component, OnInit } from '@angular/core';
import { OrdersServiceService } from 'src/app/modules/order-service/orders-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  alive = true;
  orders: Array<any>;

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
      this.orders = data;
    });
  }
}
