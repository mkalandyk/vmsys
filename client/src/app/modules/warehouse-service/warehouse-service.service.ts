import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseServiceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any | null> {
    return this.http.get('//localhost:8080/warehouse');
  }

  updateAddress(address): Observable<any | null> {
    console.log('updating');
    return this.http.post('//localhost:8080/warehouse/update', address);
  }
}
