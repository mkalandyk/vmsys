import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseServiceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any | null> {
    return this.http.get('https://vmsys-api.herokuapp.com/warehouse');
  }

  updateAddress(address): Observable<any | null> {
    console.log('updating');
    return this.http.post('https://vmsys-api.herokuapp.com/warehouse/update', address);
  }
}
