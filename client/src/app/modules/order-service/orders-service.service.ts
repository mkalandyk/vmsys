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
    return this.http.get('https://vmsys-api.herokuapp.com/orderlist/product_full');
  }

  getAllM(): Observable<any | null> {
    return this.http.get('https://vmsys-api.herokuapp.com/orderlist/machine_full');
  }

  completeSchedule(): Observable<any | null> {
    return this.http.post('https://vmsys-api.herokuapp.com/orderlist/completeList', {complete: ''});
  }
}
