import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any | null> {
    return this.http.get('//localhost:8080/products');
  }

  updateProduct(product): Observable<any | null> {
    return this.http.post('//localhost:8080/products/update', product);
  }
}