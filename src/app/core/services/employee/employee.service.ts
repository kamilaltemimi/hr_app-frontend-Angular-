import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL = 'http://localhost:3000/employee'

  constructor(
    private http: HttpClient
  ) { }

  getAllEmployees(): Observable<User[]> {
    return this.http.get<User[]>(this.URL)
  }

  updateEmployee(user: User): Observable<User> {
    return this.http.put<User>(`${this.URL}/${user.ID}`, user)
  }

  deactivateEmployee(user: User): Observable<User> {
    return this.http.put<User>(`${this.URL}/${user.ID}/deactivate`, user)
  }

  activateEmployee(user: User): Observable<User> {
    return this.http.put<User>(`${this.URL}/${user.ID}/activate`, user)
  }
}
