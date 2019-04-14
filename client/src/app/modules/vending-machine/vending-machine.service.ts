import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendingMachineService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any | null> {
    return this.http.get('//localhost:8080/vendingmachines');
  }

  getMachineById(id): Observable<any | null> {
    return this.http.get('//localhost:8080/vendingmachines/' + id);
  }
}
