import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProjectsService {
  idUser = JSON.parse(sessionStorage.getItem('auth-user'))["id"];
  private readonly URL = 'http://192.168.1.22:5000/projects/'+this.idUser; // id de usuario cambiar !!!!!!!!!!!!!
  constructor(private http: HttpClient) { }
  resolveItems(): Observable<any> {
    return this.http.get(this.URL);
  }
}