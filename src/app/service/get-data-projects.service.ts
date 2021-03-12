import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataProjectsService {
  
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    var URL = 'http://127.0.0.1:5000/project/GetStates/'; 
    return this.http.get(URL);
  }

}
