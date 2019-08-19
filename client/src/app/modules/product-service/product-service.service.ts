import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any | null> {
    return this.http.get('https://vmsys-api.herokuapp.com/products');
  }

  updateProduct(product): Observable<any | null> {
    return this.http.post('https://vmsys-api.herokuapp.com/products/update', product);
  }
}
