import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {

  constructor(private http: HttpClient) {
  }

  getAllP(): Observable<any | null> {
    return this.http.get('//localhost:8080/orderlist/product_full');
  }

  getAllM(): Observable<any | null> {
    return this.http.get('//localhost:8080/orderlist/machine_full');
  }
}
