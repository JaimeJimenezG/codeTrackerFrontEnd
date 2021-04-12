import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const QUERYADRESS = 'http://192.168.1.22:5000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  newProject(data): Observable<any> {
    return this.http.post(QUERYADRESS+'projects', {
      "name": data['name'],
      "ownersId": "601799c8819caa877e58d1cc", // get owners ID dynamic
      "path": data['path'],
      "procesName": data['procesName'],
      "desc": data['desc'],
      "workspace": data['workspace']
    }, httpOptions);
  }

  getData(): Observable<any> {
    return this.http.get(QUERYADRESS+'project/GetStates/');
  }

  
  resolveItems(): Observable<any> {
    var idUser = JSON.parse(sessionStorage.getItem('auth-user'))["id"];
    return this.http.get(QUERYADRESS+'projects/'+idUser);
  }

  deleteProject(_id): Observable<any> {
    return this.http.delete(QUERYADRESS+'project/'+_id);
  }
}
