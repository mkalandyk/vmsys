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
    return this.http.get('https://vmsys-api.herokuapp.com/vendingmachines');
  }

  getMachineById(id): Observable<any | null> {
    return this.http.get('https://vmsys-api.herokuapp.com/vendingmachines/' + id);
  }

  updateMachine(vendingmachine): Observable<any | null> {
    return this.http.post('https://vmsys-api.herokuapp.com/vendingmachines/' + vendingmachine.machineId, vendingmachine);
  }

  getLastId(): Observable<any | null> {
    return this.http.get('https://vmsys-api.herokuapp.com/vendingmachines/last');
  }
}
