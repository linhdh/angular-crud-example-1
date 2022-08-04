import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(environment.baseUrl);
  }

  get(id: Guid): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${environment.baseUrl}/${id}`);
  }

  create(data: Tutorial): Observable<any> {
    return this.http.post(environment.baseUrl, data);
  }

  update(id: Guid, data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/${id}`, data);
  }

  delete(id: Guid): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/${id}`);
  }

  findByTitle(title: string): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${environment.baseUrl}?title=${title}`);
  }
}
