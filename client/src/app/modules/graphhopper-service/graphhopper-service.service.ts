import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const key = '8756735b-b600-4818-9dad-3b1b456601ef'; // '88fb14b8-1e1b-4f83-8402-c193eb73f5fe';

@Injectable({
  providedIn: 'root'
})
export class GraphhopperServiceService {

  constructor(private http: HttpClient) { }

  postForOptimization(body): Observable<any | null> {
    return this.http.post('https://graphhopper.com/api/1/vrp/optimize?key=' + key, body);
  }

  getJobStatus(jobID): Observable<any | null> {
    return this.http.get('https://graphhopper.com/api/1/vrp/solution/' + jobID + '?key=' + key);
  }
}
