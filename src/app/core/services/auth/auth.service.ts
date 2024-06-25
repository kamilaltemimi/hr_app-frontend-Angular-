import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = new BehaviorSubject<User | null>(null)

  URL = 'http://localhost:3000/employee'

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<User[]> {
    return this.http.get<User[]>(this.URL)
  }

  getEmployeeBySubdivision(subdivision: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.URL}/subdivision/${subdivision}`)
  }

  getEmployeeById(id: string): Observable<User> {
    return this.http.get<User>(`${this.URL}/${id}`)
  }

}
